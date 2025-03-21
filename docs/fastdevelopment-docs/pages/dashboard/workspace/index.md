# Workspace Route Documentation

This document describes the `workspace` route, which displays the user's workspace containing frames and related information.

## Template Structure

The `workspace` route uses the following components to structure its layout:

- **`WorkspaceContainer`**: A container component that provides the main layout for the workspace.
  - **`WorkspaceContainer (ms)`**: A smaller container for displaying greeting, date and infobar.
    - **`PrimaryText (sm)`**: Displays the current date.
    - **`Greeting`**: Displays a personalized greeting with the user's first name.
    - **`InfoBar`**: Displays relevant information about the workspace.
  - **`Grid`**: A grid component to display frames.
    - **`Frame`**: Represents a single frame within the workspace.
      - **`PrimaryText (lg)`**: Displays the frame title.
  - **`EmptyFrameMessage`**: Displays a message when no frames are available.
- **`SpeedInsights`**: Component for performance monitoring.

## Script Logic

The script section of the `workspace` route handles data fetching, user information, and date formatting.

### Imports

- `WorkspaceContainer`: Component for the workspace layout.
- `Greeting`: Component for displaying the greeting.
- `Frame`: Component for displaying individual frames.
- `Grid`: Component for grid layout.
- `PrimaryText`: Component for displaying text.
- `useWorkspace`: Pinia store for managing workspace data.
- `SpeedInsights`: Component for performance monitoring.
- `storeToRefs`: Utility from Pinia for reactive store access.
- `InfoBar`: Component for displaying workspace information.
- `EmptyFrameMessage`: Component for displaying empty frame message.
- `useCookie`: Nuxt utility for managing cookies.
- `ref`: Vue reactivity utility.
- `onMounted`: Vue lifecycle hook.

### Data and State

- `frames`: Reactive reference to the `frames` array from the `useWorkspace` store.
- `userName`: Reactive reference to the user's name, retrieved from a cookie or the workspace data.

### Functions

- **`resetModalStateForLists()`**: Resets the `stateModal` property of lists within each frame to `false`. This is likely used to close any open modal states when the component mounts.
- **`currentDate()`**: Formats and returns the current date and day of the week in a user-friendly format.
  - Retrieves the current date using `new Date()`.
  - Defines arrays for month and day names.
  - Formats the date string as "Day of Week, Day of Month de Month".
- **`getFirstName(name)`**: Extracts the first name from a full name string.

### Lifecycle Hooks

- **`onMounted()`**:
  - Calls `useWorkspace().fetchWorkspaceData()` to fetch workspace data.
  - Populates the `frames` array with fetched frame data.
  - Sets the `userName` and cookie if not already set.
  - Calls `resetModalStateForLists()` to reset modal states.

## Components

### `WorkspaceContainer`

- Provides the main layout for the workspace.
- Accepts `md` and `ms` props for different container sizes.

### `Greeting`

- Displays a personalized greeting.
- Receives the user's first name as a prop.

### `Frame`

- Represents a single frame in the workspace.
- Receives `frameID` and `frame` data as props.
- Displays the frame title using `PrimaryText`.

### `Grid`

- Provides a grid layout for displaying frames.
- Accepts a `col` prop to define the number of columns.

### `PrimaryText`

- Displays text with customizable sizes (`sm`, `lg`).
- Accepts classes for styling.

### `InfoBar`

- Displays relevant information about the workspace.

### `EmptyFrameMessage`

- Displays a message when no frames are available.

## Pinia Store

### `useWorkspace`

- Manages workspace data, including frames.
- Provides a `fetchWorkspaceData()` action to fetch data from an API.

## Cookies

- The user's name is stored in a cookie named "name".

## Performance

- The `SpeedInsights` component is used for performance monitoring.
