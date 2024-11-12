# Overview 📚

- [Installation](#installation)
- [Node version](#node-version)
- [How to find your way around the project](#how-can-i-locate-myself-in-the-project)
- [Folder structure](#folder-structure)
- [Component specific folder](#component-specific-folder)
- [How to manipulate user data?](#how-to-manipulate-user-data)
- [How to contribute](#how-to-contribute)

## Installation

1. **Fork the Repository:**
   - Fork this repository by clicking the "Fork" button in the top right corner of this page. This will create a copy of the repository in your GitHub account.

2. **Clone the Repository:**
   - Clone the forked repository to your local development environment.

   ```bash
   git clone git@github.com:Luizboaventura1/fastdevelopment.git
   cd fastdevelopment
   npm install
   npm run dev

3. **Create your firebase project**
  - put the environment variables in the `.env.template` example.

4. **Firebase configuration**
  - Create a "users" document in Firebase and then create the Google login option in Firebase Authentication

### .env.template

```
# Create a project in firebase and put your keys here
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=

# Make your own key, example: g3f3-3r5g-3fwd-3fwc
ROUTE_KEY=
```  

Then just create a document called `users` in firestore and you will be able to use the application and contribute.

## Node version

`v22.11.0`

## How can I locate myself in the project?

#### `/pages`
  - Here are all the project routes
#### `/middleware`
  - Control the routes that the user can access in this folder
#### `/components/common`
  - Global components

## Folder Structure

The `components/common` folder contains all the components used throughout the application, each feature will have its own `/components` folder if that component is very specific and will not be used again.

### Component specific folder

- Structure

- **/components**
  - _Global components here..._

- **/pages**
  - **/auth**
    - **/components**

  - **/dashboard**
    - **/components**

Just follow this pattern for specific components, otherwise throw everything in the `/components/common` folder

## How to manipulate user data?

```javascript
import { useWorkspace } from "~/stores/workspace";
import { storeToRefs } from "pinia";

let { frames } = storeToRefs(useWorkspace());
```
By calling `useWorkspace().frames` you can access all user frames, this is the main way to manipulate user data.

See another example taking other types of data:
```javascript
onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      userEmail.value = data.email;
      userId.value = data.id;
    });
});
```
See what data you can get by accessing the `workspace.js` file in the `stores` folder.

## How to Contribute

### 1. First open an issue

Before submitting any changes, open an issue describing the reason for the change and the proposed solution. If the issue is approved, you may proceed to the next step below.

### 2. Open a Pull Request

After the issue is approved and you've made the necessary changes, open a pull request. The code will then be evaluated by me, and if everything is satisfactory, I will accept the change.
