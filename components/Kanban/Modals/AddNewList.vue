<template>
  <AddCardFormRoot
    buttonName="Adicionar nova lista"
    @inputValue="(val) => newListInput = val"
    :event="addNewList"
    space
  />
</template>

<script setup>
import AddCardFormRoot from '~/components/Common/Forms/AddCardForm/AddCardFormRoot.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, getFirestore } from "firebase/firestore";
import { useFrame } from '~/stores/frame';

const auth = getAuth()
const db = getFirestore()

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
        idUser.value = doc.id
      })

    }
  })
})


let props = defineProps({
  indexCard: Number,
  indexFrame: Number,
})

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

// Validate Card

const validateCard = (description) => {
  description.trim()
  if (description.length === 0)
    return false

  return true
}

const clearInput = () => {
  newListInput.value = ''
}

const addListToFirebase = (list) => {
  const frameDocRef = doc(db, 'users', idUser.value);

  updateDoc(frameDocRef, {
    frame: list
  })
}

</script>

<style lang="scss" scoped>
.add-new-card {
  transition: .3s;
  &:hover {
    background-color: #000000;
  }
}
</style>