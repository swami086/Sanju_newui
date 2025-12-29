'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Figma Designed Background Image - Soft Lighting & Glass Walls */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_soft_bg.png"
          alt="Modern office interior with glass walls"
          className="w-full h-full object-cover"
        />
        {/* Refined Dark Overlay for Soft Lighting */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[56px] md:text-[80px] font-medium leading-[1.05] mb-8 tracking-tighter text-white font-inter">
              More than just space — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#a855f7]">
                find your place.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-inter font-light"
          >
            At Gentle Space, we transform real estate into a strategic asset. We deliver premium, move-in ready workspaces designed to eliminate operational friction and empower your team to focus on what matters most. Discover your next flagship office today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <Link
              href="tel:+918105279639"
              className="inline-block bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-10 py-4 rounded-full font-bold transition-all text-[16px] tracking-[0.5px] shadow-2xl shadow-purple-500/20 active:scale-95"
            >
              +91 81052 79639
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}