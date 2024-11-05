 # Home page
 
 This script sets up and manages the state, components, and user interactions for the home page of a FastDevelopment project. It includes authentication handling, navigation, and button actions. 
 
 ## Imports
 - **Components**:
   - `BuyMeACoffe`, `Header`, `Main`, `MainTitle`, `SecondaryText`, `PrimaryButton`, `SectionBenefits`, `Section`: Components used in the page layout.
 - **Firebase Auth**:
   - `onAuthStateChanged`, `getAuth`: Firebase functions for handling authentication.
 - **Speed Insights**:
   - `SpeedInsights`: Imported from Vercel to monitor performance metrics.
 
 ## Variables
 - **`auth`**: Stores the Firebase authentication instance returned by `getAuth()`.
 - **`gtag`**: Google Analytics object, used for tracking events.
 - **`logged`**: A `ref` that indicates the user's login state, initialized by checking the value of the `token` cookie.
 - **`router`**: An instance of the router for navigating between routes.
 
 ## Functions
 
 ### `startButton()`
 - **Description**: Redirects the user based on their login status.
 - **Logic**:
   - If `logged.value` is `true`, it navigates the user to the `/dashboard/workspace` route.
   - If `logged.value` is `false`, it redirects the user to the login page (`/auth/login`).
 
 ### `handleStartButton()`
 - **Description**: Handles the click event for the start button and logs the event in Google Analytics.
 - **Logic**:
   - Calls `startButton()` to handle the navigation.
   - Uses `gtag` to log a click event with the category "CTA Home".
 
 ## Firebase Authentication State Change
 - **`onAuthStateChanged`**: Monitors the authentication state to update the `logged` variable.
   - When a user logs in or logs out, `logged.value` is updated accordingly.
 
 ## Lifecycle Hook
 
 ### `onBeforeMount()`
 - **Description**: Checks the user's login status before mounting the component.
 - **Logic**:
   - If `logged.value` is `true`, navigates the user to `/dashboard/workspace` to provide quick access to their workspace.
 
 ## Usage Notes
 - This setup assumes a `token` cookie is set upon login, allowing for a quick check of the user's login status.
 - Google Analytics is configured to track specific user interactions, helping monitor the effectiveness of the call-to-action.
 - Ensure Firebase is correctly initialized in the project, and that Google Analytics is set up if `gtag` is used.
