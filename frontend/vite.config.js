import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-app-ne.onrender.com',
        changeOrigin: true,
        secure: true,
    },
      // Proxy WebSocket requests for socket.io
      '/socket.io': {
        target: 'https://chat-app-ne.onrender.com', 
        ws: true, // Important to proxy WebSocket connections
        changeOrigin: true,
      },
    },
  },
})
