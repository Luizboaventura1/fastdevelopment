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
  imports: {
    autoImport: true
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-gtag',
    'nuxt-primevue',
  ],
  plugins: [
    "~/plugins/firebase.js",
    "@/plugins/primevue.js"
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  runtimeConfig: {
    gtag: {
      id: 'G-1P1CHBPTH6'
    }
  },
})
