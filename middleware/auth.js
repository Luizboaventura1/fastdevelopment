import { useRoute } from "vue-router"

export default defineNuxtRouteMiddleware(() => {
  //const logged = useCookie('token')

  const route = useRoute()
  let isLoggedIn = ref(true)//logged.value
  
  if (!isLoggedIn.value && route.name === 'dashboard') {
    return navigateTo('/auth/login')
  }

})
