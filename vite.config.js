import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        plugins: [
            laravel(['resources/ts/main.tsx']),
            tailwindcss(),
            react()
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/ts/src'),
            }
        },
        optimizeDeps: {
            exclude: ['lucide-react'],
        },
        server: {
            port: parseInt(env.VITE_PORT) || 5080,
            strictPort: true,
            host: '0.0.0.0',  // Add this to allow external connections
            hmr: {
                host: 'localhost'
            }
        },
        preview: {
            port: parseInt(env.VITE_PORT) || 5080,
            host: '0.0.0.0',  // Add this to allow external connections
            strictPort: true,
        },
    };
});
