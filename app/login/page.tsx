'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { useRollbar } from '@rollbar/react';

import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const rollbar = useRollbar();
    const { user } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            console.log('User detected in context, redirecting...');
            const role = user.app_metadata?.role;
            if (role === 'admin' || role === 'super_admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Attempting login...');

            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Login request timed out. Please check your internet connection.')), 15000)
            );

            // Race between login and timeout
            const loginPromise = supabase.auth.signInWithPassword({
                email,
                password,
            });

            const result = await Promise.race([loginPromise, timeoutPromise]) as any;

            if (result.error) throw result.error;

            console.log('Login API returned success');
            // The useEffect above will handle the redirect once AuthContext updates

        } catch (err: any) {
            console.error('Login error:', err);
            rollbar.error('Login attempt failed', err, { email: email.replace(/(..)(.*)(@.*)/, '$1***$3') });

            let errorMessage = err.message || 'Failed to sign in';
            if (errorMessage.includes('fetch') || errorMessage.includes('connection')) {
                errorMessage = 'Network error: Please check your internet connection.';
            }

            setError(errorMessage);
            setLoading(false); // Only stop loading on error. On success, keep loading until redirect.
        }
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow flex flex-col md:flex-row bg-theme-background">
                {/* Left Side: Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md"
                    >
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold mb-3 font-manrope">Welcome back</h1>
                            <p className="text-white/60 text-lg">Enter your details to access your workspace.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-bold mb-2">Work Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-bold">Password</label>
                                    <a href="#" className="text-sm text-purple-400 font-bold hover:underline">Forgot?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/20 hover:bg-purple-700 hover:shadow-purple-500/30 transition-all text-lg disabled:opacity-50"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </motion.button>
                        </form>

                        <p className="mt-10 text-center text-white/50 font-medium">
                            Don't have an account?{' '}
                            <a href="#" className="text-purple-400 font-bold hover:underline">Join Gentle Space</a>
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Visual Content */}
                <div className="hidden md:block w-1/2 relative bg-zinc-900 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/images/custom-workspaces.png"
                            alt="Modern Workspace"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                    </motion.div>

                    <div className="absolute bottom-20 left-16 right-16 z-10 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 font-manrope leading-tight">
                                "Finding the perfect office space shouldn't be a hurdle."
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm"></div>
                                <div>
                                    <p className="font-bold text-xl">Founder's Vision</p>
                                    <p className="text-white/80">Gentle Space Solutions</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
