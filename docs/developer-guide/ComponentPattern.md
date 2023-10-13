# Folder Structure

The main components folder is used throughout the project, each feature has its components folder for something more specific

## Component specific folder

- Structure

- **/src**
  - **/components**
    - *Global components here...*

  - **/Pages**
    - **/Auth**
      - **/components**
        - *Feature-specific components for Feature Auth here...*
      - *Other files related to Feature Auth here...*

    - **/Dashboard**
      - **/components**
        - *Feature-specific components for Feature Dashboard here...*
      - *Other files related to Feature Dashboard here...*

  - *Other project files here...*

- *Other project folders and files here...*

In the components folder there is a folder called Common which contains generic components that will be used throughout the project

- Components

  - Buttons
    All buttons will have a prop called event where you can add a function to it
  
  - Common
    The common folder is where the components that will be used throughout the system will be stored