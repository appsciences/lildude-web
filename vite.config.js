import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // keep Firebase out of the initial paint path
        manualChunks: { firebase: ['firebase/app', 'firebase/firestore'] },
      },
    },
  },
})
