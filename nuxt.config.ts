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
    'nuxt-gtag'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  runtimeConfig: {
    public: {
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
