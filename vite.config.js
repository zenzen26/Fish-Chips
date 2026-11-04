import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// VITE_BASE is set to /Fish-Chips/ by the GitHub Pages workflow; everywhere else the site lives at the root.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  server: { open: true },
});
