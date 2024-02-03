## **Overview of stores** 🛒

Summary

- [Workspace](#workspacejs)

## [Workspace.js](./workspace.js)

We will start by talking about the `frames` state

```js
  state: () => {
    return {
      frames: []
    };
  },
```

We will use it to store all user frames, where it can be used throughout the application, in the example above it is empty, it starts in the file [workspace.vue](../pages/dashboard/workspace.vue).

We have an action that is used to get other user data such as name, email, etc.

```js
actions: {
    workspace() {
      const auth = getAuth();
      const db = getFirestore();

      let userEmail = "";

      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (user) {
              userEmail = user.email;

              const q = query(
                collection(db, "users"),
                where("email", "==", userEmail)
              );

              const querySnapshot = await getDocs(q);

              let result = null;

              querySnapshot.forEach((doc) => {
                result = {
                  id: doc.id,
                  photoUrl: user.photoURL,
                  name: doc.data().name,
                  email: doc.data().email,
                  frames: doc.data().workspace,
                };
              });

              resolve(result);
            }
          } catch (error) {
            reject(error);
          } finally {
            unsubscribe();
          }
        });
      });
    },
  },
```

Example for getting data from `workspace`

Get all user frames:
```js
const frames = ref(useWorkspace().frames)
```

Get user data:
```js
onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      // Output
      /*
      {
        id: doc.id,
        photoUrl: user.photoURL,
        name: doc.data().name,
        email: doc.data().email,
        frames: doc.data().workspace,
      }
      */
    });
});
```
