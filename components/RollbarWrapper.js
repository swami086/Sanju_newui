'use client';

import { Provider as RollbarProvider } from '@rollbar/react';
import { clientConfig } from '../lib/rollbar/config';

export default function RollbarWrapper({ children }) {
    return (
        <RollbarProvider config={clientConfig}>
            {children}
        </RollbarProvider>
    );
}
