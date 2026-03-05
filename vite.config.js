import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '5173-ie408lcbrjwmnbhpjmny5-487de0ac.sg1.manus.computer',
      '.manus.computer',
    ],
  },
})
