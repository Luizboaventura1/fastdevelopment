export default defineNuxtRouteMiddleware((to, from) => {
  let isLoggedIn = useState('user', () => false)

  if (!isLoggedIn.value) 
    return navigateTo('/auth/login')
})
