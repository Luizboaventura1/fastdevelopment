# Middleware Path

to manage routes, useCookie() is used, when the user is not logged in, all routes are blocked and the only free ones are the home page and login and registration pages

Example:
```
const logged = useCookie('token')

logged = true // unblock the routes
logged = false // blocks the routes
```