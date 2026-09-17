import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': resolve(process.cwd(), '../shared'),
    },
  },
  publicDir: resolve(process.cwd(), 'public'),
  server: {
    port: 5173,
    ...(env.VITE_DEV_API_PROXY_TARGET
      ? { proxy: { '/api': env.VITE_DEV_API_PROXY_TARGET } }
      : {}),
  },
  };
});
