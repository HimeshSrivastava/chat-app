import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', 
        changeOrigin: true,
        secure: false,
      },
      // Proxy WebSocket requests for socket.io
      '/socket.io': {
        target: 'http://localhost:4000', 
        ws: true, // Important to proxy WebSocket connections
        changeOrigin: true,
      },
    },
  },
})
