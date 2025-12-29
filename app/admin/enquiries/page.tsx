'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Mail,
    Phone,
    Building2,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRollbar } from '@rollbar/react';
import { AnimatePresence, motion } from 'framer-motion';

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionError, setActionError] = useState<string | null>(null);
    const supabase = createClient();
    const rollbar = useRollbar();

    useEffect(() => {
        fetchEnquiries();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('enquiries-updates')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'enquiries'
            }, () => {
                fetchEnquiries();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [statusFilter]);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('enquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;
            if (error) throw error;
            setEnquiries(data || []);
        } catch (error: any) {
            rollbar.error('Error fetching enquiries', error);
            setActionError('Failed to load enquiries. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setActionError(null);
        try {
            const response = await fetch(`/api/enquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update status');
            }

            fetchEnquiries();
        } catch (error: any) {
            rollbar.error('Error updating status', error, { enquiryId: id, newStatus });
            setActionError('Error updating status: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return;
        setActionError(null);

        try {
            const response = await fetch(`/api/enquiries/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete enquiry');
            }

            fetchEnquiries();
        } catch (error: any) {
            rollbar.error('Error deleting enquiry', error, { enquiryId: id });
            setActionError('Error deleting enquiry: ' + error.message);
        }
    };

    const filteredEnquiries = enquiries.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'resolved': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'archived': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    return (
        <div className="space-y-8 relative">
            <AnimatePresence>
                {actionError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-8 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20"
                    >
                        <AlertCircle size={20} />
                        <span className="font-medium text-sm">{actionError}</span>
                        <button onClick={() => setActionError(null)} className="ml-2 hover:bg-white/20 p-1 rounded-full transition-colors">
                            <MoreVertical size={16} /> {/* Using as close button icon for simplicity, cross icon better */}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Business Enquiries</h1>
                <p className="text-zinc-500">Track and manage incoming workspace requests.</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
                {/* Filters & Search */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-xl px-4 py-2 flex-grow max-w-md">
                        <Search size={18} className="text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Filter size={18} className="text-zinc-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                {/* List */}
                <div className="divide-y divide-white/5">
                    {loading ? (
                        <div className="p-12 text-center text-zinc-500">Loading enquiries...</div>
                    ) : filteredEnquiries.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500">No enquiries found.</div>
                    ) : (
                        filteredEnquiries.map((enquiry) => (
                            <div key={enquiry.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold">
                                                    {enquiry.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium">{enquiry.name}</h3>
                                                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                                                        {enquiry.company && (
                                                            <span className="flex items-center gap-1">
                                                                <Building2 size={12} /> {enquiry.company}
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} /> {new Date(enquiry.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(enquiry.status)}`}>
                                                {enquiry.status.replace('_', ' ')}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                                <Mail size={16} className="text-zinc-600" />
                                                <a href={`mailto:${enquiry.email}`} className="hover:text-purple-400 transition-colors">{enquiry.email}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                                <Phone size={16} className="text-zinc-600" />
                                                <a href={`tel:${enquiry.phone}`} className="hover:text-purple-400 transition-colors">{enquiry.phone || 'No phone provided'}</a>
                                            </div>
                                        </div>

                                        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                            <p className="text-sm text-zinc-300 leading-relaxed italic">
                                                "{enquiry.requirements}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col justify-end gap-2 shrink-0">
                                        <select
                                            value={enquiry.status}
                                            onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                                            className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-purple-500"
                                        >
                                            <option value="new">Set as New</option>
                                            <option value="in_progress">Mark In Progress</option>
                                            <option value="resolved">Mark Resolved</option>
                                            <option value="archived">Archive</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(enquiry.id)}
                                            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-all"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
