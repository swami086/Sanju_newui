import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { serverInstance } from '@/lib/rollbar/config'

export async function middleware(request: NextRequest) {
    try {
        return await updateSession(request)
    } catch (error: any) {
        // Redact sensitive headers before logging
        const headers = Object.fromEntries(request.headers);
        const sensitiveHeaders = ['authorization', 'cookie', 'x-supabase-key'];

        sensitiveHeaders.forEach(header => {
            if (headers[header]) headers[header] = '[REDACTED]';
        });

        serverInstance.error(error, {
            request: {
                url: request.url,
                method: request.method,
                headers: headers,
                remoteAddress: request.headers.get('x-forwarded-for') || 'unknown'
            }
        });

        // Safe fallback to prevent duplicate failures and side effects
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
