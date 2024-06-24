import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WebWorkerPlugin from 'vite-plugin-webworker-service';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/test_task_FWT/"
  plugins: [react(), WebWorkerPlugin()],
});
