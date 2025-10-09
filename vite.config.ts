import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
        svgr({ exportAsDefault: true }),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
        ],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8001'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
