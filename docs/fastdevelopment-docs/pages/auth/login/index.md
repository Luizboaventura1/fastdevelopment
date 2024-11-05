# Login

This script handles the user authentication process using Google Sign-In in a Vue.js application. It manages the login state, error handling, and user data storage in Firestore.

## Imports and Initialization
- **`auth`**: Firebase authentication instance obtained from `getAuth()`.
- **`toast`**: Toast notification utility for displaying messages to the user.
- **`router`**: Router instance for navigation within the application, obtained from `useRouter()`.
- **`loading`**: A reactive reference (`ref`) that indicates whether the login process is ongoing, initialized to `false`.

## Functions

### `loginWithGoogle()`
- **Description**: Authenticates the user using Google Sign-In.
- **Logic**:
  - Sets `loading.value` to `true` to indicate that the login process is in progress.
  - Creates a new `GoogleAuthProvider` instance for Google authentication.
  - Initiates the sign-in process using `signInWithPopup(auth, provider)`.
  - If the sign-in is successful:
    - Retrieves the user's `uid`, `email`, and `displayName` from the result.
    - Sets a cookie named `token` to `true`, indicating that the user is logged in.
    - Checks if the user already exists in Firestore with the `checkIfTheUserExists(email)` function.
      - If the user does not exist, it calls `addUserInFirestore(displayName, email, uid)` to add the user to Firestore.
    - Redirects the user to the dashboard workspace (`/dashboard/workspace`).
  - If an error occurs during the login process:
    - Sets `loading.value` to `false` to indicate the login attempt has ended.
    - Displays a toast notification with the message "Verifique sua conexão!" for 2.5 seconds to inform the user of the issue.

## Usage Notes
- Ensure that Firebase authentication and Firestore are correctly configured in the project.
- The `checkIfTheUserExists` and `addUserInFirestore` functions should be implemented to manage user data effectively.
- The toast notification utility must be set up to display messages appropriately to enhance user experience.
