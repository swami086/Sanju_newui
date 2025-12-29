import Rollbar from 'rollbar';
import { clientConfig, serverInstance } from './config';

// Determine if we are on the client or server
const isServer = typeof window === 'undefined';

const getRollbar = () => {
    if (isServer) {
        return serverInstance;
    }
    // On client, we might want a singleton or just use the one from provider
    // But for manual logging in non-component files, we can create a client instance
    return new Rollbar(clientConfig);
};

export const logger = {
    info: (message: string, data?: any) => {
        getRollbar().info(message, data);
        if (process.env.NODE_ENV !== 'production') {
            console.info(`[Rollbar Info] ${message}`, data);
        }
    },
    warn: (message: string, data?: any) => {
        getRollbar().warning(message, data);
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`[Rollbar Warn] ${message}`, data);
        }
    },
    error: (message: string, error?: any, context?: any) => {
        getRollbar().error(message, error, context);
        if (process.env.NODE_ENV !== 'production') {
            console.error(`[Rollbar Error] ${message}`, error, context);
        }
    },
    critical: (message: string, error?: any, context?: any) => {
        getRollbar().critical(message, error, context);
        if (process.env.NODE_ENV !== 'production') {
            console.error(`[Rollbar Critical] ${message}`, error, context);
        }
    }
};
