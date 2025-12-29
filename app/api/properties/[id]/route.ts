import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/rollbar/api-error-handler';
import { serverInstance } from '@/lib/rollbar/config';

async function validateAdmin(supabase: any) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;

    const role = user.app_metadata?.role;
    return role === 'admin' || role === 'super_admin';
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            const notFoundError = new Error('Property not found');
            (notFoundError as any).status = 404;
            return await handleApiError(notFoundError, request, { propertyId: id });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return await handleApiError(error, request, { propertyId: id });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const supabase = await createClient();
        if (!await validateAdmin(supabase)) {
            const authError = new Error('Unauthorized property update attempt');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { propertyId: id });
        }

        const body = await request.clone().json();
        const { data, error } = await supabase
            .from('properties')
            .update(body)
            .eq('id', id)
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error: any) {
        return await handleApiError(error, request, { propertyId: id });
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
            const authError = new Error('Unauthorized property deletion attempt');
            (authError as any).status = 403;
            return await handleApiError(authError, request, { propertyId: id });
        }

        // 1. Fetch property to get image path
        const { data: property, error: fetchError } = await supabase
            .from('properties')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // 2. Delete storage object if it exists
        if (property.image_url) {
            try {
                const urlParts = property.image_url.split('/');
                const fileName = urlParts[urlParts.length - 1];
                const folderName = urlParts[urlParts.length - 2];
                const filePath = `${folderName}/${fileName}`;

                await supabase.storage
                    .from('property-images')
                    .remove([filePath]);
            } catch (storageError) {
                serverInstance.warning('Storage cleanup failed during property deletion', { storageError, propertyId: id });
                // Continue with record deletion even if storage cleanup fails
            }
        }

        // 3. Delete DB record
        const { error: deleteError } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return await handleApiError(error, request, { propertyId: id });
    }
}
