import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    origin: 'http://localhost:8080',
  },
  plugins: [react(), viteSingleFile()],
});
