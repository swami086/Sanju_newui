'use client';

import { useEffect, useState } from 'react';
import {
    Users,
    ShieldCheck,
    Search,
    UserPlus,
    Mail,
    Calendar,
    MoreVertical,
    X,
    Check,
    AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRollbar } from '@rollbar/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UsersPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionError, setActionError] = useState<string | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const rollbar = useRollbar();

    // Invite form state
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [inviteRole, setInviteRole] = useState('admin');
    const [invitePassword, setInvitePassword] = useState('');
    const [inviting, setInviting] = useState(false);
    const [inviteError, setInviteError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
        };
        checkUser();
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProfiles(data || []);
        } catch (error: any) {
            rollbar.error('Error fetching admin profiles', error);
            setActionError('Failed to load user profiles. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviting(true);
        setInviteError(null);

        try {
            const response = await fetch('/api/admin/users/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: inviteEmail,
                    full_name: inviteName,
                    role: inviteRole,
                    password: invitePassword
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to invite user');
            }

            setIsInviteModalOpen(false);
            setInviteEmail('');
            setInviteName('');
            setInvitePassword('');
            fetchProfiles();
            // Success feedback could be improved but for now let's just use actionError if we had a success state
        } catch (err: any) {
            rollbar.error('User invitation failed', err, { email: inviteEmail.replace(/(..)(.*)(@.*)/, '$1***$3') });
            setInviteError(err.message);
        } finally {
            setInviting(false);
        }
    };

    const handleRoleUpdate = async (userId: string, newRole: string) => {
        setActionError(null);
        try {
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update role');
            }

            fetchProfiles();
        } catch (err: any) {
            rollbar.error('Role update failed', err, { targetUserId: userId, newRole });
            setActionError('Error updating role: ' + err.message);
        }
    };

    const isSuperAdmin = currentUser?.app_metadata?.role === 'super_admin';

    const filteredProfiles = profiles.filter(p =>
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.full_name && p.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (!isSuperAdmin && !loading && currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4">
                    <AlertCircle size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Access Restricted</h1>
                <p className="text-zinc-500 max-w-md">
                    Only Super Administrators have access to user management. Please contact your system administrator if you believe this is an error.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-zinc-500">Manage administrator accounts and permissions.</p>
                </div>
                <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                    <UserPlus size={18} />
                    Invite Admin
                </button>
            </div>

            <AnimatePresence>
                {actionError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-500 text-sm flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <AlertCircle size={18} />
                            {actionError}
                        </div>
                        <button onClick={() => setActionError(null)} className="text-red-500/50 hover:text-red-500">
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-xl px-4 py-2 flex-grow max-w-md">
                        <Search size={18} className="text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by email or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-full"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">Loading users...</td>
                                </tr>
                            ) : filteredProfiles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">No users found.</td>
                                </tr>
                            ) : (
                                filteredProfiles.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-medium">
                                                    {profile.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{profile.full_name || 'Anonymous User'}</p>
                                                    <p className="text-xs text-zinc-500">{profile.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.role === 'super_admin' ? 'bg-purple-500/10 text-purple-400' :
                                                profile.role === 'admin' ? 'bg-blue-500/10 text-blue-400' :
                                                    'bg-zinc-500/10 text-zinc-400'
                                                }`}>
                                                {profile.role === 'super_admin' && <ShieldCheck size={12} />}
                                                {profile.role.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                <Calendar size={14} className="text-zinc-600" />
                                                {new Date(profile.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative group/actions inline-block">
                                                <select
                                                    value={profile.role}
                                                    onChange={(e) => handleRoleUpdate(profile.id, e.target.value)}
                                                    className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-purple-500"
                                                    disabled={profile.id === currentUser?.id} // Don't allow self-demotion
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="super_admin">Super Admin</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold text-white">Invite New Administrator</h2>
                            <button onClick={() => setIsInviteModalOpen(false)} className="text-zinc-5100 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleInvite} className="p-6 space-y-4">
                            {inviteError && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm flex items-center gap-3">
                                    <AlertCircle size={18} />
                                    {inviteError}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={inviteName}
                                    onChange={(e) => setInviteName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Temporary Password</label>
                                <input
                                    type="password"
                                    value={invitePassword}
                                    onChange={(e) => setInvitePassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                                <p className="text-[10px] text-zinc-500 mt-1">Provide this password to the invitee. They should change it upon login.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Assign Role</label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin" className="bg-zinc-900">Super Admin</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsInviteModalOpen(false)}
                                    className="flex-1 px-6 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={inviting}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                                >
                                    {inviting ? 'Inviting...' : (
                                        <>
                                            <Check size={18} />
                                            Send Invitation
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
