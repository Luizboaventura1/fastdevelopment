# Auth.js Middleware
 
 This middleware file defines a route guard using Nuxt’s `defineNuxtRouteMiddleware` function to protect specific routes based on user authentication status.
 
 ## Imports
 - **`useRoute`**: From `vue-router`, it is used to access route details within the middleware.
 - **`defineNuxtRouteMiddleware`**: A Nuxt function that allows you to define custom middleware to control navigation between routes.
 
 ## Middleware Logic
 
 ### Variables
 - **`logged`**: A cookie that stores the user's token, which determines their login status.
 - **`route`**: An object representing the current route, accessed through `useRoute()`.
 - **`isLoggedIn`**: A `ref` that checks whether the user is logged in by reading the value of the `token` cookie.
 
 ### Authentication Check
 - This middleware checks if the user is authenticated:
   - If `isLoggedIn.value` is `false` and the user tries to access the `dashboard` route (identified by `route.name === "dashboard"`), the middleware redirects them to the login page.
 
 ### Redirection
 - **`navigateTo("/auth/login")`**: If the user is not logged in and attempts to access the `dashboard` route, they are redirected to `/auth/login`.