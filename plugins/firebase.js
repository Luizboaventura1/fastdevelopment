import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { data: firebaseAPIKeys } = await useFetch(`/api/firebase`);

    const firebaseConfig = {
      apiKey: firebaseAPIKeys.value.API_KEY,
      authDomain: firebaseAPIKeys.value.AUTH_DOMAIN,
      projectId: firebaseAPIKeys.value.PROJECT_ID,
      storageBucket: firebaseAPIKeys.value.STORAGE_BUCKET,
      messagingSenderId: firebaseAPIKeys.value.MESSAGING_SENDER_ID,
      appId: firebaseAPIKeys.value.APP_ID,
      measurementId: firebaseAPIKeys.value.MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    nuxtApp.vueApp.provide("auth", auth);
    nuxtApp.provide("auth", auth);

    nuxtApp.vueApp.provide("firestore", firestore);
    nuxtApp.provide("firestore", firestore);
  } catch (error) {
    throw error;
  }
});
