import PrimeVue from "primevue/config";
import "primevue/resources/themes/soho-light/theme.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(PrimeVue);
});
