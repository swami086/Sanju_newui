module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/rollbar/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientConfig",
    ()=>clientConfig,
    "serverInstance",
    ()=>serverInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rollbar$2f$src$2f$server$2f$rollbar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rollbar/src/server/rollbar.js [app-route] (ecmascript)");
;
const isProduction = ("TURBOPACK compile-time value", "development") === 'production';
const hasClientToken = !!("TURBOPACK compile-time value", "9b22a3e0b69e4dc0975c17ae9b0705eb");
const hasServerToken = !!process.env.ROLLBAR_SERVER_TOKEN;
const clientConfig = {
    accessToken: ("TURBOPACK compile-time value", "9b22a3e0b69e4dc0975c17ae9b0705eb"),
    environment: ("TURBOPACK compile-time value", "production") || ("TURBOPACK compile-time value", "development"),
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: process.env.ROLLBAR_CODE_VERSION,
                guess_uncaught_frames: true
            }
        }
    },
    enabled: hasClientToken
};
const serverInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rollbar$2f$src$2f$server$2f$rollbar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
    environment: ("TURBOPACK compile-time value", "production") || ("TURBOPACK compile-time value", "development"),
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        code_version: process.env.ROLLBAR_CODE_VERSION,
        server: {
            root: 'webpack:///./'
        }
    },
    enabled: true
});
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/rollbar/api-error-handler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleApiError",
    ()=>handleApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rollbar$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rollbar/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function handleApiError(error, request, additionalContext = {}) {
    const url = new URL(request.url);
    const context = {
        method: request.method,
        url: request.url,
        pathname: url.pathname,
        headers: Object.fromEntries(request.headers),
        ...additionalContext
    };
    // Sanitize headers
    const sensitiveHeaders = [
        'authorization',
        'cookie',
        'x-supabase-key'
    ];
    sensitiveHeaders.forEach((h)=>{
        if (context.headers[h]) context.headers[h] = '[REDACTED]';
    });
    // Fetch user context if possible
    let person = undefined;
    try {
        const { createClient } = await __turbopack_context__.A("[project]/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            person = {
                id: user.id,
                email: user.email,
                role: user.app_metadata?.role || 'user'
            };
        }
    } catch (e) {
    // Ignore user fetch errors during error handling
    }
    // Promisify the error reporting to ensure it finishes before response is sent
    await new Promise((resolve)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rollbar$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverInstance"].error(error, {
            request: context,
            person
        }, (err)=>{
            if (err && ("TURBOPACK compile-time value", "development") !== 'production') {
                console.error('Rollbar dispatch error:', err.message || err);
            }
            resolve();
        });
    });
    // Determine error message and status
    const message = error.message || 'An internal server error occurred';
    const status = error.status || 500;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'ServerError',
        message: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : message,
        requestId: context.headers['x-request-id'] || 'unknown'
    }, {
        status
    });
}
}),
"[project]/app/api/test-rollbar/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rollbar$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rollbar/api-error-handler.ts [app-route] (ecmascript)");
;
async function GET(request) {
    try {
        throw new Error('FINAL_VERIFICATION_ERROR: Testing with new Server Token privileges.');
    } catch (error) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rollbar$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error, request, {
            verification: true,
            tokenType: 'post_server_item'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__17818ddc._.js.map