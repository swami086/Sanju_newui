import { createClient, createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/rollbar/api-error-handler';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Check if requester is super_admin
        const { data: { user: requester }, error: reqError } = await supabase.auth.getUser();
        if (reqError || requester?.app_metadata?.role !== 'super_admin') {
            const authError = new Error('Unauthorized invitation attempt: User is not super_admin');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { requesterId: requester?.id });
        }

        const body = await request.clone().json();
        const { email, role, full_name, password } = body;

        if (!email || !role || !password) {
            const validationError = new Error('Validation failed: Email, role, and password are required');
            (validationError as any).status = 400;
            return await handleApiError(validationError, request, { payload: { email, role, full_name } });
        }

        const adminClient = createAdminClient();

        // 1. Create user in Auth
        const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name },
            app_metadata: { role }
        });

        if (authError) throw authError;

        // 2. Profile is usually handled by a trigger, but if not, we insert it
        const { error: profileError } = await adminClient
            .from('profiles')
            .upsert({
                id: authUser.user.id,
                email,
                full_name,
                role
            });

        if (profileError) throw profileError;

        return NextResponse.json({ success: true, user: authUser.user });
    } catch (error: any) {
        return await handleApiError(error, request);
    }
}
