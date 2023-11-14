<template>
  <AddCardFormRoot
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => titleInput = val"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardFormRoot from '~/components/Common/Forms/AddCardForm/AddCardFormRoot.vue';
import { useFrame } from '~/stores/frame';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, getFirestore } from "firebase/firestore";

const auth = getAuth()
const db = getFirestore()

const dbFrame = useFrame().frame

let userEmail = ref("")
let idUser = ref("")

// Get id in firestore
onMounted(() => {

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      const q = query(collection(db, "users"), where("email", "==", userEmail.value))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        idUser.value = doc.id
      })

    }
  })
})

let props = defineProps({
  indexFrame: Number
})

// Add new card

let titleInput = ref('')

const addNewCard = () => {
  if (validateCard(titleInput.value)) {
    dbFrame.at(props.indexFrame).cards.push({
      title: titleInput.value,
      description: ""
    })

    const frameDocRef = doc(db, 'users', idUser.value);

    updateDoc(frameDocRef, {
      frame: dbFrame
    })

    clearInput()
  } 
}

// Validate Card

const validateCard = (description) => {
  let desc = description.replace(/\s+/g, '').trim()
  if (desc.length === 0)
    return false

  return true
}

const clearInput = () => {
  titleInput.value = ''
}
</script>

<style lang="scss" scoped>

</style>