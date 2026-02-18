import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import environment from 'vite-plugin-environment';

export default defineConfig({
  root: 'frontend',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/index.html'),
      output: {
        manualChunks: (id) => {
          // Split vendor dependencies into separate chunks
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // TanStack libraries (router + query)
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Icon libraries
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            // Charting libraries
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            // Three.js and 3D libraries
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-3d';
            }
            // Other vendor code
            return 'vendor-misc';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
});
