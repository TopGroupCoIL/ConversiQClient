import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    origin: 'https://poc-conversiq-384717576.il-central-1.elb.amazonaws.com',
  },
  plugins: [react(), viteSingleFile()],
});
