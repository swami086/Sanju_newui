'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Video,
    Building2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRollbar } from '@rollbar/react';
import { AlertCircle } from 'lucide-react';

export default function PropertiesListPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionError, setActionError] = useState<string | null>(null);
    const supabase = createClient();
    const rollbar = useRollbar();

    useEffect(() => {
        fetchProperties();
    }, [statusFilter]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter !== 'all') {
                params.append('status', statusFilter);
            }

            const response = await fetch(`/api/properties?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch properties');
            }

            const data = await response.json();
            setProperties(data || []);
        } catch (error: any) {
            rollbar.error('Error fetching properties', error);
            setActionError('Failed to load properties. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;
        setActionError(null);

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorMessage = 'Failed to delete property';
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } else {
                        errorMessage = await response.text();
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', parseError);
                }
                throw new Error(errorMessage);
            }

            fetchProperties();
        } catch (error: any) {
            rollbar.error('Error deleting property', error, { propertyId: id });
            setActionError('Error deleting property: ' + error.message);
        }
    };

    const filteredProperties = properties.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <AnimatePresence>
                {actionError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 z-50 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20"
                    >
                        <AlertCircle size={24} />
                        <div>
                            <p className="font-bold text-sm">Action Failed</p>
                            <p className="text-xs opacity-90">{actionError}</p>
                        </div>
                        <button onClick={() => setActionError(null)} className="ml-4 opacity-70 hover:opacity-100 p-1">
                            <Plus size={20} className="rotate-45" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Properties</h1>
                    <p className="text-zinc-500">Manage your property listings and visibility.</p>
                </div>
                <Link
                    href="/admin/properties/new"
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add New Property
                </Link>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
                {/* Filters & Search */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-xl px-4 py-2 flex-grow max-w-md">
                        <Search size={18} className="text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by title..."
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
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Created Date</th>
                                <th className="px-6 py-4">Created By</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Loading properties...</td>
                                </tr>
                            ) : filteredProperties.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">No properties found.</td>
                                </tr>
                            ) : (
                                filteredProperties.map((property) => (
                                    <tr key={property.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 relative">
                                                    {property.image_url ? (
                                                        <img src={property.image_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                            <Building2 size={24} />
                                                        </div>
                                                    )}
                                                    {property.is_video && (
                                                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                                                            <Video size={10} className="text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{property.title}</p>
                                                    <p className="text-xs text-zinc-500 line-clamp-1 max-w-[200px]">{property.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.status === 'published' ? 'bg-green-500/10 text-green-400' :
                                                property.status === 'draft' ? 'bg-zinc-500/10 text-zinc-400' :
                                                    'bg-red-500/10 text-red-400'
                                                }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400">
                                            {new Date(property.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400">
                                            {property.created_by?.split('-')[0]}...
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/properties/${property.id}/edit`}
                                                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(property.id)}
                                                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
