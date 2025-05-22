import { useRoute } from "vue-router";

export default defineNuxtRouteMiddleware(() => {
  const logged = useCookie("token");
  const route = useRoute();

  let isLoggedIn = logged.value;

  if (!isLoggedIn && route.name === "dashboard") {
    return navigateTo("/auth/login");
  }
});
