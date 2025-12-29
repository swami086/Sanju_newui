'use client';

import { User } from '@supabase/supabase-js';
import { Bell, Search, User as UserIcon } from 'lucide-react';

export default function AdminHeader({ user }: { user: User }) {
    return (
        <header className="h-[72px] bg-black border-b border-white/5 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96">
                <Search size={18} className="text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-full"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="text-zinc-400 hover:text-white relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">{user.email?.split('@')[0]}</p>
                        <p className="text-xs text-zinc-500 capitalize">{user.app_metadata?.role || 'Admin'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <UserIcon size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
}
