import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    // Explicitly exclude backend-only packages so Vite doesn't pre-bundle them
    exclude: [
      '@whiskeysockets/baileys',
      'pino',
      'nodemailer',
      'bcrypt',
      'bcryptjs',
      'pg',
      'jsonwebtoken',
      'multer',
      'groq-sdk',
      'qrcode-terminal',
      'dotenv',
    ],
  },
})