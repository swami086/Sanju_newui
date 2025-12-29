'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function PropertyGallery() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchProperties = async () => {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching properties:', error);
            } else {
                setProperties(data || []);
            }
            setLoading(false);
        };

        fetchProperties();
    }, []);

    // Fallback items if no properties in DB
    const fallbackItems = [
        {
            title: 'Agile Tech Park Suites',
            description: 'Flexible lease structures with enterprise-grade infrastructure.',
            image_url: '/images/service-furnished.png',
            is_video: false
        },
        {
            title: 'Collaborative Synergy Hubs',
            description: 'Architecturally designed layouts optimized for team interaction.',
            image_url: '/images/service-coworking.png',
            is_video: false
        }
    ];

    const displayItems = properties.length > 0 ? properties : fallbackItems;

    return (
        <section className="bg-black py-24 border-t border-white/5">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-4">
                        Property Gallery
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {displayItems.map((item, i) => (
                            <motion.div
                                key={item.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-900 border transition-all duration-300 ${item.is_video
                                    ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                    : 'border-white/10 group-hover:border-white/20'
                                    }`}>
                                    <Image
                                        src={item.image_url || '/images/hero-office.png'}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    {item.is_video && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                                <Play className="text-white fill-white ml-1" size={20} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <h3 className="text-white text-lg font-medium mb-1 group-hover:text-purple-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300"
                    >
                        View All Properties
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
