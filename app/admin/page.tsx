'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
    Building2,
    MessageSquare,
    Users,
    TrendingUp,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
    const { profile } = useAuth();

    const stats = [
        { title: 'Total Properties', value: '12', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-400/10', href: '/admin/properties' },
        { title: 'New Enquiries', value: '5', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10', href: '/admin/enquiries' },
        { title: 'Admin Users', value: '3', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10', href: '/admin/users' },
        { title: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-pink-400', bg: 'bg-pink-400/10', href: '#' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {profile?.full_name?.split(' ')[0] || 'Admin'}</h1>
                <p className="text-zinc-500">Here's an overview of your property portal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-zinc-900 border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">{stat.title}</p>
                        <div className="flex items-end justify-between mt-1">
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            <Link
                                href={stat.href}
                                className="text-zinc-500 hover:text-white transition-colors"
                                title="View Details"
                            >
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Building2 size={20} className="text-purple-400" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/admin/properties/new"
                            className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
                        >
                            <p className="text-white font-medium mb-1 group-hover:text-purple-400">Add Property</p>
                            <p className="text-zinc-500 text-xs text-balance">Create a new listing.</p>
                        </Link>
                        <Link
                            href="/admin/enquiries"
                            className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                        >
                            <p className="text-white font-medium mb-1 group-hover:text-blue-400">View Enquiries</p>
                            <p className="text-zinc-500 text-xs text-balance">Manage workspace requests.</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <TrendingUp size={32} className="text-zinc-500" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Detailed Analytics</h3>
                    <p className="text-zinc-500 text-sm max-w-[240px]">
                        Full portal performance metrics and property insights are coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
