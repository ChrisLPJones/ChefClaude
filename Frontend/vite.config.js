import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-spinners']  // Ensure Vite optimizes this dependency
  },
  build: {
    rollupOptions: {
      external: ['react-spinners']  // Externalize react-spinners if necessary
    }
  }
})
