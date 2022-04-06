import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
  ],
  server: {
    fs: {
      strict: false
    }
  }
})
