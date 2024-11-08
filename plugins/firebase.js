import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

async function fetchRouteKey() {
  try {
    const route = await useFetch('/api/route')
    return route.data.value.ROUTE_KEY
  } catch (error) {
    console.error('Error getting route key:', error)
    throw error
  }
}

async function fetchFirebaseData(routeKey) {
  try {
    const firebaseData = await useFetch(`/api/firebase/${routeKey}`)
    return firebaseData.data.value
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const routeKey = await fetchRouteKey()
    const firebaseData = await fetchFirebaseData(routeKey)

    const firebaseConfig = {
      apiKey: firebaseData.data.API_KEY,
      authDomain: firebaseData.data.AUTH_DOMAIN,
      projectId: firebaseData.data.PROJECT_ID,
      storageBucket: firebaseData.data.STORAGE_BUCKET,
      messagingSenderId: firebaseData.data.MESSAGING_SENDER_ID,
      appId: firebaseData.data.APP_ID,
      measurementId: firebaseData.data.MEASUREMENT_ID,
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const firestore = getFirestore(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
  } catch (error) {
    console.error(error)
  }
})