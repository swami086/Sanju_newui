import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/rollbar/api-error-handler';

async function validateAdmin(supabase: any) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;

    const role = user.app_metadata?.role;
    return role === 'admin' || role === 'super_admin';
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const supabase = await createClient();
        if (!await validateAdmin(supabase)) {
            const authError = new Error('Unauthorized enquiry update attempt');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { enquiryId: id });
        }

        const body = await request.clone().json();
        const { data, error } = await supabase
            .from('enquiries')
            .update(body)
            .eq('id', id)
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error: any) {
        return await handleApiError(error, request, { enquiryId: id });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const supabase = await createClient();
        if (!await validateAdmin(supabase)) {
            const authError = new Error('Unauthorized enquiry deletion attempt');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { enquiryId: id });
        }

        const { error } = await supabase
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return await handleApiError(error, request, { enquiryId: id });
    }
}
