import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],


  optimizeDeps: {
    exclude: ['url'] // url 모듈을 제외시킴
  }
})
