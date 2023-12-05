import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(async nuxtApp => {

  const ROUTE_KEY = await useFetch('/api/route')
  .then(route => route.data.value.ROUTE_KEY)
  
  const FIREBASE_DATA = await useFetch(`/api/firebase/${ROUTE_KEY}`)
  .then(firebase => firebase.data.value)
  
  const firebaseConfig = {
    apiKey: FIREBASE_DATA.data.API_KEY,
    authDomain: FIREBASE_DATA.data.AUTH_DOMAIN,
    projectId: FIREBASE_DATA.data.PROJECT_ID,
    storageBucket: FIREBASE_DATA.data.STORAGE_BUCKET,
    messagingSenderId: FIREBASE_DATA.data.MESSAGING_SENDER_ID,
    appId: FIREBASE_DATA.data.APP_ID,
    measurementId: FIREBASE_DATA.data.MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const firestore = getFirestore(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)

  nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.provide('firestore', firestore)

})