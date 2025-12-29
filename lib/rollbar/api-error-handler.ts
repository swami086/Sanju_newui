import { serverInstance } from './config';
import { NextResponse } from 'next/server';

export async function handleApiError(
    error: any,
    request: Request,
    additionalContext: any = {}
) {
    const url = new URL(request.url);
    const context = {
        method: request.method,
        url: request.url,
        pathname: url.pathname,
        headers: Object.fromEntries(request.headers),
        ...additionalContext,
    };

    // Sanitize headers
    const sensitiveHeaders = ['authorization', 'cookie', 'x-supabase-key'];
    sensitiveHeaders.forEach(h => {
        if (context.headers[h]) context.headers[h] = '[REDACTED]';
    });

    // Fetch user context if possible
    let person = undefined;
    try {
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            person = {
                id: user.id,
                email: user.email,
                role: user.app_metadata?.role || 'user'
            };
        }
    } catch (e) {
        // Ignore user fetch errors during error handling
    }

    // Promisify error reporting with timeout to ensure it finishes before response is sent
    const rollbarPromise = new Promise<void>((resolve) => {
        serverInstance.error(error, {
            request: context,
            person
        }, (err: any) => {
            if (err && process.env.NODE_ENV !== 'production') {
                console.error('Rollbar dispatch error:', err.message || err);
            }
            resolve();
        });
    });

    // Timeout after 2 seconds to prevent hanging
    const timeoutPromise = new Promise<void>((resolve) =>
        setTimeout(() => resolve(), 2000)
    );

    await Promise.race([rollbarPromise, timeoutPromise]);

    // Determine error message and status
    const message = error.message || 'An internal server error occurred';
    const status = error.status || 500;

    return NextResponse.json(
        {
            error: 'ServerError',
            message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : message,
            requestId: context.headers['x-request-id'] || 'unknown'
        },
        { status }
    );
}
