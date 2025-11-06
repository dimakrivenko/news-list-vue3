import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import pxtorom from '@minko-fe/postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variables" as *; @use "@/assets/scss/mixins" as *; @use "@/assets/scss/mixins" as *;`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer,
        pxtorom({
          rootValue: 16,
          selectorBlackList: ['some-class'],
          propList: ['*'],
          atRules: ['media'],
        }),
      ],
    },
  },
})
