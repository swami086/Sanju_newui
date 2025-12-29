import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/rollbar/api-error-handler';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const bodyContent = await request.clone().json();
        const { name, email, phone, company, requirements } = bodyContent;

        if (!name || !email || !requirements) {
            const validationError = new Error('Validation failed: Missing required fields');
            (validationError as any).status = 400;
            return await handleApiError(validationError, request, { fields: { name, email, requirements } });
        }

        const { data, error } = await supabase
            .from('enquiries')
            .insert([
                {
                    name,
                    email,
                    phone,
                    company,
                    requirements,
                    status: 'new'
                },
            ])
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return await handleApiError(error, request);
    }
}
