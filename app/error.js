'use client';

import { useRollbar } from '@rollbar/react';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    const rollbar = useRollbar();

    useEffect(() => {
        rollbar.error(error);
    }, [error, rollbar]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-sans">
            <div className="bg-gray-900 border border-purple-900/50 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Something went wrong!</h2>
                <p className="mb-8 text-gray-400">
                    An unexpected error has occurred. Our engineers have been notified and are looking into it.
                </p>
                <button
                    onClick={() => reset()}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
