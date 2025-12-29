'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useRollbar } from '@rollbar/react';
import { setRollbarPerson } from '@/lib/rollbar/user-context';

type AuthContextType = {
    user: User | null;
    profile: any | null;
    session: Session | null;
    loading: boolean;
    error: Error | null;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    error: null,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const supabase = createClient();
    const rollbar = useRollbar();

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                // It's possible the profile hasn't been created yet for new users
                if (error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error);
                    rollbar.error('Error fetching user profile', error, { userId });
                }
                return null;
            }
            return data;
        } catch (err: any) {
            console.error('Error in fetchProfile:', err);
            rollbar.error('Critical error in fetchProfile', err, { userId });
            return null;
        }
    };

    useEffect(() => {
        const setData = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                setSession(session);
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setRollbarPerson(rollbar, currentUser);

                if (currentUser) {
                    // Fetch profile asynchronously without blocking loading state
                    fetchProfile(currentUser.id).then(data => setProfile(data));
                } else {
                    setProfile(null);
                }

                setLoading(false);
            } catch (err: any) {
                setError(err);
                rollbar.error('Auth context initial setup failed', err);
                setLoading(false);
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            setRollbarPerson(rollbar, currentUser);

            setLoading(false); // Set loading false immediately when we have user

            if (currentUser) {
                fetchProfile(currentUser.id).then(data => setProfile(data));
            } else {
                setProfile(null);
            }
        });

        setData();

        return () => {
            subscription.unsubscribe();
        };
    }, [rollbar, supabase]);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setRollbarPerson(rollbar, null);
            setProfile(null);
        } catch (err: any) {
            rollbar.error('Sign out failed', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, session, loading, error, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
