# Middleware Path

to manage routes, useCookie() is used, when the user is not logged in, all routes are blocked and the only free ones are the home page and login and registration pages

Example:
```
const logged = useCookie('token')

logged = true // unblock the routes
logged = false // blocks the routes
```

in a piece of code, it checks whether the user is logged in or not, and if he is, he will be able to access the route, you will see this code on the pages

```
// Checks whether the user is logged in or not

onMounted(() => {
  const logged = useCookie('token')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      logged.value = true
      loading.value = false
    }
     else {
      logged.value = false
      router.push('/')
    }
  })
})
```