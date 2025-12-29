'use client';

import { motion } from 'framer-motion';
import { PiggyBank, Handshake, Briefcase } from 'lucide-react';

const reasons = [
    {
        title: 'Cost Optimization',
        desc: 'Maximize your operational ROI with workspace solutions strategically curated to align with your financial objectives.',
        icon: PiggyBank
    },
    {
        title: 'Integrity & Transparency',
        desc: 'Our commitment to clear, consistent communication ensures complete alignment throughout the entire procurement process.',
        icon: Handshake
    },
    {
        title: 'Strategic Advisory',
        desc: 'Leverage professional industry expertise and deep market intelligence to successfully navigate the commercial landscape.',
        icon: Briefcase
    }
];

export default function WhyChoose() {
    return (
        <section className="bg-black py-24 border-t border-white/5">
            <div className="container-wide">
                <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-16 text-center">
                    The Gentle Space Advantage
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-full aspect-square bg-[#111111] rounded-3xl flex items-center justify-center mb-8 border border-white/5">
                                <reason.icon size={64} className="text-[#8b5cf6] stroke-[1.5px]" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-4">{reason.title}</h3>
                            <p className="text-white/50 leading-relaxed max-w-xs">{reason.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
