// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css',],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    autoImport: true
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-gtag',
  ],

  plugins: [
    "~/plugins/firebase.js",
  ],

  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },

  gtag: {
    id: 'G-1P1CHBPTH6'
  },

  compatibilityDate: '2024-10-16'
})