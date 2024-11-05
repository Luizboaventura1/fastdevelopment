 # Dashboard.vue
 
 This script manages the state and functionalities for the dashboard component of the FastDevelopment project. It includes user authentication handling, modal management for creating new frames, and the logout process.
 
 ## Imports and Initialization
 - **`auth`**: Firebase authentication instance obtained from `getAuth()`.
 - **`router`**: Router instance for navigation within the application, obtained from `useRouter()`.
 - **`frames`**: Reactive reference to the frames from the workspace store, utilizing `storeToRefs` with `useWorkspace()`.
 - **`loading`**: A `ref` that indicates whether the dashboard is in a loading state, initialized to `true`.
 
 ## Page Metadata
 - **`definePageMeta`**: Sets middleware to "auth" to ensure only authenticated users can access the dashboard.
 
 ## Functions
 
 ### `logout()`
 - **Description**: Handles the logout process for the user.
 - **Logic**:
   - Sets `loading.value` to `true` while signing out the user.
   - After signing out, sets the token cookie to `false`, deletes all cookies, resets the frames, and navigates to the home page (`/`).
 
 ### `dashboardToggle()`
 - **Description**: Toggles the visibility of the dashboard.
 - **Logic**:
   - If the current width is equal to `totalWidthDashboard`, it sets the width to `0`, hiding the dashboard.
   - Otherwise, it sets the width back to `totalWidthDashboard`.
 
 ## Lifecycle Hooks
 
 ### `onMounted()`
 - **Description**: Monitors the authentication state when the component is mounted.
 - **Logic**:
   - Uses `onAuthStateChanged` to check if the user is logged in.
   - Updates the `logged` cookie and `loading` state based on the authentication status.
   - If the user is not authenticated, redirects them to the home page (`/`).
 
 ## Warning Message Management
 - **`stateWarningMessage`**: A `ref` that indicates if the warning message modal is open.
 - **`warningMessage`**: A `ref` that holds the message to be displayed in the warning.
 
 ### Warning Message Functions
 - **`openWarningMessage(message)`**: Opens the warning message modal with a specified message.
 - **`cancelWarningMessage()`**: Closes the warning message modal.
 - **`confirmWarningMessage()`**: Calls the `logout()` function and cancels the warning message.
 
 ## SEO Configuration
 - **`useHead`**: Sets the page title and meta tags for search engine optimization.
 
 ## Modal Management for Creating New Frame
 - **`stateModalCreateNewFrame`**: A `ref` that indicates if the modal for creating a new frame is open.
 - **`inputCreateNewFrame`**: A `ref` that holds the input value for the new frame title.
 - **`errorMessageFrame`**: A `ref` that holds any error messages related to frame creation.
 
 ### Frame Creation Functions
 - **`handleCreateNewFrame`**: Contains functions to open and close the modal for creating a new frame.
 - **`createNewFrame()`**: Validates the frame title and, if valid, creates a new frame and navigates to it.
 
 ### Watcher for Input
 - **`watch(inputCreateNewFrame, ...)`**: Watches the input for the new frame title and clears the error message if the input is not empty.
 
 ## Usage Notes
 - Ensure the Firebase authentication and cookie management are set up correctly for this script to function as intended.
 - Proper validation logic must be implemented in the `validateFrame` function to prevent invalid frame creation.
 - The dashboard functionality assumes a user-friendly interface where users can easily create and manage their development frames.
