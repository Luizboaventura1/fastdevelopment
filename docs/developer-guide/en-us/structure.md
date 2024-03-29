# Developer guide 📚

- [Installation](#installation)
- [Node version](#node-version)
- [How to find your way around the project](#how-can-i-locate-myself-in-the-project)
- [Folder structure](#folder-structure)
- [Component specific folder](#component-specific-folder)
- [How to manipulate user data?](#how-to-manipulate-user-data)
- [Language](#language)

## Installation

1. **Fork the Repository:**
   - Fork this repository by clicking the "Fork" button in the top right corner of this page. This will create a copy of the repository in your GitHub account.

2. **Clone the Repository:**
   - Clone the forked repository to your local development environment.

   ```bash
   git clone git@github.com:Luizboaventura1/fastdevelopment.git
   cd fastdevelopment

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

`v18.16.0`

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

let frames = useWorkspace().frames;
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

## Language

  - ### [pt-br](../pt-br/estrutura.md)