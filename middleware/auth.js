export default defineNuxtRouteMiddleware((to, from) => {
  let isLoggedIn = useState('user', () => true)

  if (!isLoggedIn.value) 
    return navigateTo('/auth/login')
})
