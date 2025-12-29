'use client';

import Rollbar from 'rollbar';
import { clientConfig } from '../lib/rollbar/config';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        const rollbar = new Rollbar(clientConfig);
        rollbar.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-black text-white font-sans">
                <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                    <div className="bg-gray-900 border border-red-900/50 p-10 rounded-2xl shadow-2xl max-w-lg w-full">
                        <h1 className="text-4xl font-bold mb-6 text-red-500">Critical Error</h1>
                        <p className="mb-10 text-gray-400 text-lg">
                            A serious problem occurred that prevented the application from loading.
                            The technical details have been sent to our monitoring service.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-900/20 active:scale-95"
                        >
                            Restart Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
