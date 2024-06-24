import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WebWorkerPlugin from 'vite-plugin-webworker-service';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WebWorkerPlugin()],
});
