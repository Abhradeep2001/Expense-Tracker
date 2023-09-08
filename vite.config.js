import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'replace-env-vars',
      transform: (code) => {
        return code.replace(/import\.meta\.env/g, 'import.meta.env');
      },
    },
  ],
});
