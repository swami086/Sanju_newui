import Link from 'next/link';
import { Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="container-wide flex flex-col items-center">
        <div className="flex gap-10 mb-8 text-sm text-white/50">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>

        <div className="flex gap-6 mb-8 text-white/40">
          <Link href="https://twitter.com" className="hover:text-[#8b5cf6] transition-colors">
            <Twitter size={20} />
          </Link>
          <Link href="https://instagram.com" className="hover:text-[#8b5cf6] transition-colors">
            <Instagram size={20} />
          </Link>
        </div>

        <p className="text-sm text-white/30 font-inter">
          © 2024 Gentle Space. All rights reserved.
        </p>
      </div>
    </footer>
  );
}