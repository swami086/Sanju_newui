'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/5">
      <nav className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <Link href="#home" className="text-[14px] text-[#d1d5db] hover:text-white transition-colors">Home</Link>
          <Link href="#service" className="text-[14px] text-[#d1d5db] hover:text-white transition-colors">Services</Link>
          <Link href="#about" className="text-[14px] text-[#d1d5db] hover:text-white transition-colors">About</Link>
          <Link href="#faq" className="text-[14px] text-[#d1d5db] hover:text-white transition-colors">FAQ</Link>
          <Link href="#contact" className="text-[14px] text-[#d1d5db] hover:text-white transition-colors">Contact</Link>
        </div>

        <Link
          href="tel:+918105279639"
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-[12px] px-5 py-2 rounded-full font-medium transition-all"
        >
          +91 81052 79639
        </Link>
      </nav>
    </header>
  );
}