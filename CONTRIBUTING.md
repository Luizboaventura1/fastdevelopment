# CONTRIBUTING 🚀

- [Installation](#installation)
- [Node version](#node-version)
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

## How to Contribute

### 1. First open an issue

Before submitting any changes, open an issue describing the reason for the change and the proposed solution. If the issue is approved, you may proceed to the next step below.

### 2. Open a Pull Request

After the issue is approved and you've made the necessary changes, open a pull request. The code will then be evaluated by me, and if everything is satisfactory, I will accept the change.
