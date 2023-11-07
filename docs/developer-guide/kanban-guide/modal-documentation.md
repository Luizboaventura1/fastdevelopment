# Modals folder

## AddNewList.vue file

In this part of the code, the logged in user's email is fetched to get the id in the firestore, with the value of the id fetched, the list can be updated when the user adds a new one.

```
const frames = useFrame().frame

let userEmail = ref("")
let idUser = ref("")

onMounted(() => {

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      // get id

      const q = query(collection(db, "users"), where("email", "==", userEmail.value))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        idUser.value = doc.id // getting the firestore id here
      })

    }
  })
})
```

Here we take the name of the list that the user entered and then this new change is updated locally, then it is updated in Firebase with the addListToFirebase(frames) function.

Why update this data locally?

Using it this way we can bring a constant experience to the user without having to wait for any loading, but all data is watched by a watch ensuring that it is in fact updated in firebase.

```
// Add new List

let newListInput = ref('')

const addNewList = () => {
  if (validateCard(newListInput.value)) {
    frames.push({
      title: newListInput.value,
      cards: [] 
    })

    addListToFirebase(frames)

    clearInput()
  }
}
```