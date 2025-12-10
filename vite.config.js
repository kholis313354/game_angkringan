import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/game_angkringan/', // Ganti dengan nama repository GitHub Anda
})

