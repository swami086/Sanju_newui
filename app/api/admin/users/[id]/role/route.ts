import { createClient, createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/rollbar/api-error-handler';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    let payload: any = {};
    try {
        const supabase = await createClient();

        // Check if requester is super_admin
        const { data: { user: requester }, error: reqError } = await supabase.auth.getUser();

        payload = await request.clone().json();
        const { role } = payload;

        if (reqError || requester?.app_metadata?.role !== 'super_admin') {
            const authError = new Error('Unauthorized role change attempt');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { targetUserId: id, intendedRole: role });
        }

        if (!role) {
            const validationError = new Error('Role is required');
            (validationError as any).status = 400;
            return await handleApiError(validationError, request, { targetUserId: id });
        }

        const adminClient = createAdminClient();

        // 1. Update app_metadata in Auth
        const { error: authError } = await adminClient.auth.admin.updateUserById(
            id,
            { app_metadata: { role } }
        );

        if (authError) throw authError;

        // 2. Update profile table
        const { error: profileError } = await adminClient
            .from('profiles')
            .update({ role })
            .eq('id', id);

        if (profileError) throw profileError;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return await handleApiError(error, request, { targetUserId: id, role: payload?.role });
    }
}
