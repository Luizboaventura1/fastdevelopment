# Developer guide 📚

## How can I locate myself in the project?

`/pages`
  - Here are all the project routes
`/middleware`
  - Control the routes that the user can access in this folder
`/components/common`
  - Global components

## Node version

`v18.16.0`

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

# Attention 🚨

It is not yet possible to contribute to the project, but you will soon be able to make your contributions.