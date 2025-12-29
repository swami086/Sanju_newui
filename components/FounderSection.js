'use client';

import { motion } from 'framer-motion';

export default function FounderSection() {
  return (
    <section className="bg-black py-24 border-t border-white/5">
      <div className="container-wide">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-[#8b5cf6]/20 shadow-2xl shadow-purple-500/20"
          >
            <img
              src="/images/founder-real.jpg"
              alt="Founder"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-medium text-white mb-2">Sanjay Singh</h3>
            <p className="text-[#8b5cf6] font-medium mb-12 flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full" />
              Founder
            </p>

            <blockquote className="text-2xl md:text-3xl font-inter text-white/70 italic leading-relaxed">
              "Finding office space shouldn't be painful. We created Gentle Space to bridge the gap between aspirational needs and finding the perfect office space that fits your business drive everyday."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}