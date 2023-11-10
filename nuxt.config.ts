// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-gtag',
  ],
  plugins: [
    "~/plugins/firebase.js"
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  runtimeConfig: {
    API_KEY1: process.env.API_KEY,
    public: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      motion: {
        directives: {
          'pop-top': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            enter: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    },
    gtag: {
      id: 'G-1P1CHBPTH6'
    }
  }
})
