import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check role from app_metadata
    const role = user.app_metadata?.role;
    if (role !== 'admin' && role !== 'super_admin') {
        redirect('/');
    }

    return (
        <div className="flex h-screen bg-black">
            <Sidebar userRole={role} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader user={user} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-950 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
