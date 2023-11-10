<template>
  <div class="container-add-new-card">
    <button
      @click="openListModal" 
      :class="`${listVisibility}`"
      class="add-new-card items-center text-zinc-300 text-sm bg-subSecondaryColorF w-full rounded-lg px-4 py-3"
    >
      <svg class="w-[15px] h-[15px] me-3 fill-zinc-300" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z" opacity="1" data-original="#000000"></path></g></svg>
      Adicionar nova lista
    </button>
    <div 
      :class="`${cardModalVisibility}`"
      class="modal-add-new-card w-full bg-subSecondaryColorF p-3 rounded-lg"
    >
      <textarea
        v-model="newListInput"
        placeholder="Nova lista"
        class="resize-none bg-secondaryColorF w-full text-white px-3 py-2 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
      />
      <div class="button-container flex gap-2 mt-2">
        <button
          @click="addNewList()"
          class="add-new-card-btn px-4 py-2 w-full rounded-lg text-white bg-secondaryColorF transition-colors hover:bg-primaryColorF font-medium"
        >
          Adicionar
        </button>
        <CloseButton
          :event="openListModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseButton from '../Buttons/CloseButton.vue';
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


// Add new card

// show modal to add new card
let listVisibility = ref('flex')
let cardModalVisibility = ref('hidden')

const openListModal = () => {
  if (listVisibility.value === 'flex') {
    listVisibility.value = 'hidden'
    cardModalVisibility.value = 'flex-1'
  } else {
    listVisibility.value = 'flex'
    cardModalVisibility.value = 'hidden'
  }
}

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