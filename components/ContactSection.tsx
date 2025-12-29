'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirements: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/enquiries/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', company: '', email: '', phone: '', requirements: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <section id="contact" className="bg-black py-24 border-t border-white/5">
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-4">Contact Us</h2>
                        <p className="text-white/50 mb-10 font-inter">Get in touch with us for any inquiries or to schedule a visit.</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-sm flex items-center gap-3"
                                    >
                                        <CheckCircle2 size={18} />
                                        Your enquiry has been submitted successfully! We'll get back to you soon.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm flex items-center gap-3"
                                    >
                                        <AlertCircle size={18} />
                                        {errorMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                                <div>
                                    <label className="block text-sm text-white/50 mb-2 ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/50 mb-2 ml-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Your Company"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                                <div>
                                    <label className="block text-sm text-white/50 mb-2 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/50 mb-2 ml-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-white/50 mb-2 ml-1">Requirement</label>
                                <textarea
                                    name="requirements"
                                    required
                                    rows={4}
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    placeholder="Your Requirements"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === 'submitting' ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Card */}
                    <div className="flex flex-col justify-end">
                        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[400px] rounded-3xl overflow-hidden group">
                            <img
                                src="/images/hero-office.png"
                                alt="Office building"
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-10 w-full">
                                <h3 className="text-3xl font-medium text-white mb-4">Contact information</h3>
                                <p className="text-white/60 mb-8 max-w-sm leading-relaxed">
                                    Get in touch directly for immediate assistance with your office booking.
                                </p>
                                <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
                                    Business Hours
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
