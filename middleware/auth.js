import { getAuth } from "@firebase/auth";
import { useRoute } from "vue-router";

export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute();
  const auth = getAuth();

  const user = auth.currentUser || await new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });

  if (!user && route.name === "dashboard") {
    return navigateTo("/auth/login");
  }
});