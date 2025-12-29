'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function VideoShowcase() {
    const videos = [
        {
            id: '1F3pP57bQ9U',
            title: 'WeWork 37 Cunningham',
            description: 'Premium Office Space in Bangalore',
        },
        {
            id: 'x0A0j2X-r3w',
            title: 'Ready for Business',
            description: 'Modern Amenities and Design',
        },
    ];

    return (
        <section className="py-20 bg-[#020603] text-white">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[52px] font-medium font-poppins mb-6">
                        Experience Our Spaces
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto font-inter">
                        Take a virtual tour of the premium commercial properties available in Bangalore.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-[#1b1e1c] border border-white/20 rounded-[24px] overflow-hidden hover:border-white/40 transition-all duration-300"
                        >
                            <div className="relative pt-[56.25%] bg-[#020603] group">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-[28px] font-medium font-poppins mb-4 leading-tight text-white">
                                    {video.title}
                                </h3>
                                <p className="text-white/60 font-inter">
                                    {video.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
