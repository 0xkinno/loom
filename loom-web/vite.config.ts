import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { include: [/node_modules/, /proto/] }
  },
  optimizeDeps: {
    include: ['../loom-plugin/src/proto/index.cjs']
  },
  server: {
    proxy: {
      '/loom': { target: 'http://localhost:50010', changeOrigin: true, rewrite: (p) => p.replace(/^\/loom/, '/v1/loom') },
      '/rpc': { target: 'http://localhost:50002', changeOrigin: true, rewrite: (p) => p.replace(/^\/rpc/, '/v1') },
      '/admin': { target: 'http://localhost:50003', changeOrigin: true, rewrite: (p) => p.replace(/^\/admin/, '/v1/admin') }
    }
  }
});
