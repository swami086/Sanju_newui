'use client';

import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function Logo({ className = "" }) {
    return (
        <Link href="/" className={`flex items-center gap-3 ${className}`}>
            <div className="w-8 h-8 bg-[#1e293b] rounded-full flex items-center justify-center">
                <Building2 size={16} className="text-[#a855f7]" />
            </div>
            <span className="text-[18px] font-normal font-inter text-white tracking-[-0.45px]">
                Gentle Space
            </span>
        </Link>
    );
}
