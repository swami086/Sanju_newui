import Rollbar from 'rollbar';

const isProduction = process.env.NODE_ENV === 'production';
const hasClientToken = !!process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN;
const hasServerToken = !!process.env.ROLLBAR_SERVER_TOKEN;

export const clientConfig = {
    accessToken: process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
    environment: process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT || process.env.NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: process.env.ROLLBAR_CODE_VERSION,
                guess_uncaught_frames: true,
            },
        },
    },
    enabled: hasClientToken && (isProduction || process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT === 'development'),
};

export const serverInstance = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
    environment: process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT || process.env.NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        code_version: process.env.ROLLBAR_CODE_VERSION,
        server: {
            root: 'webpack:///./',
        },
    },
    enabled: hasServerToken && (isProduction || process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT === 'development'),
});
