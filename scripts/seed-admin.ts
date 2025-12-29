import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function seedAdmin() {
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Super Admin';

    if (!email || !password) {
        console.log('Usage: npx tsx scripts/seed-admin.ts <email> <password> ["Name"]');
        process.exit(1);
    }

    console.log(`Creating super_admin: ${email}...`);

    try {
        // 1. Create user in Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: name },
            app_metadata: { role: 'super_admin' }
        });

        if (authError) throw authError;

        // 2. Insert into profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: authUser.user.id,
                email,
                full_name: name,
                role: 'super_admin'
            });

        if (profileError) throw profileError;

        console.log('Successfully created super_admin user and profile.');
    } catch (error: any) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
}

seedAdmin();
