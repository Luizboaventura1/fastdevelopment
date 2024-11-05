# Workspace.js

This script manages the state and functionality related to the user's workspace in a Vue.js application. It includes resetting modal states, retrieving the current date, and initializing the workspace data on component mount.

## Imports and Initialization
- **`frames`**: Reactive reference to the frames obtained from the `useWorkspace` store. This represents the user's workspace items.
- **`userName`**: Reactive reference initialized with the user's name stored in a cookie, defaulting to an empty string if not found.

## Functions

### `resetModalStateForLists()`
- **Description**: Resets the modal state for all lists within each frame in the workspace.
- **Logic**:
  - Checks if `frames.value` exists.
  - Iterates through each frame, and if it has lists, iterates through each list to set `list.stateModal` to `false`, ensuring all modals are closed.

### `currentDate()`
- **Description**: Retrieves the current date in a human-readable format.
- **Logic**:
  - Creates a new `Date` object to obtain the current date.
  - Defines arrays for months and days of the week in Portuguese.
  - Gets the current day of the week, day of the month, and month name.
  - Returns a formatted string representing the current date (e.g., "Domingo, 5 de Novembro").

## Lifecycle Hooks

### `onMounted()`
- **Description**: Lifecycle hook that runs when the component is mounted.
- **Logic**:
  - Calls the `workspace()` method from the `useWorkspace` store to retrieve the user's workspace data.
  - If `frames.value` is empty, it populates it with the frames from the retrieved data and resets the modal states for the lists.
  - If `userName.value` is not set, it updates the cookie and the `userName` reference with the name from the retrieved data.

## Usage Notes
- Ensure that the `useWorkspace` store is properly defined and that the `workspace` method is implemented to return the user's workspace data.
- The script assumes the existence of the `useCookie` utility for managing cookies.
- The `resetModalStateForLists` function is essential for maintaining UI state when frames are modified or updated.
