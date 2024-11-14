# Workspace.js Store
 
This file defines a Pinia store named `useWorkspace`, which manages the state of a user's workspace data in a Vue.js application. It interacts with Firebase Firestore for data storage and Firebase Authentication for user authentication.
 
## Imports
 - **Firebase Firestore Functions**:
   - `collection`, `query`, `where`, `getDocs`, `getFirestore`, `doc`, `updateDoc`: These functions are used to define and run Firestore queries, get Firestore instance, and update documents.
 - **Firebase Authentication Functions**:
   - `onAuthStateChanged`, `getAuth`: These functions are used to monitor authentication state changes and get the current authentication instance.
 - **Pinia Function**:
   - `defineStore`: This function defines a Pinia store.
 
 ## Store: `useWorkspace`
 
 ### State
 - **frames**: An array that holds workspace frames data for the authenticated user.
 
 ### Actions
 
 #### `workspace()`
 - **Description**: This action retrieves the authenticated user's workspace data from Firestore.
 - **Process**:
   - Authenticates user with `onAuthStateChanged`.
   - If authenticated, queries Firestore for the user’s document based on their email.
   - Returns a `result` object containing user details (id, photo URL, name, email) and the frames data for the workspace.
   - Cleans up by unsubscribing from the auth listener.
 - **Returns**: A promise that resolves with the user data object or rejects with an error.
 
 #### `updateWorkspace()`
 - **Description**: This action updates the user's workspace frames in Firestore.
 - **Process**:
   - Authenticates user and gets their document ID from Firestore.
   - Updates the `workspace` field of the user’s document with the current `frames` state array.
 - **Error Handling**: Throws an error if the user is not authenticated or if the frames array is empty.
 - **Returns**: Error message in case of failure, otherwise updates Firestore with the new frames data.
