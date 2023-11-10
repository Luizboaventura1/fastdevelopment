<template>
  <div>
    <div
      v-if="props.stateModal"
      class="modal-edit-card flex flex-col gap-1 w-[250px] p-2 bg-secondaryColorF rounded-md"
    >
      <nav class="flex items-center pb-3">
        <h1 class="text-white text-base w-full ps-1">
          Ações lista
        </h1>
        <button
          @click.stop="props.event"
          class="rounded-md flex items-center justify-center w-[45px] h-[36px] hover:bg-subSecondaryColorF transition-colors"
        >
          <svg class="fill-white w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M479.8 512a31.988 31.988 0 0 1-22.769-9.432L266.738 312.28a15.184 15.184 0 0 0-21.475 0L54.975 502.568a32.2 32.2 0 0 1-45.543-45.542L199.72 266.737a15.183 15.183 0 0 0 0-21.474L9.432 54.975A32.2 32.2 0 1 1 54.974 9.432L245.263 199.72a15.184 15.184 0 0 0 21.476 0L457.026 9.432a32.2 32.2 0 0 1 45.543 45.543L312.28 245.263a15.185 15.185 0 0 0 0 21.474l190.289 190.288A32.2 32.2 0 0 1 479.8 512z" opacity="1" data-original="#000000" class=""></path></g></svg>
        </button>
      </nav>
      <DeleteButton
        @click="openWarningMessage('Apagar lista?')"
      />
    </div>
    <WarningMessage
      :state="stateWarningMessage"
      :message="warningMessage"
      :cancel="cancelWarningMessage"
      :confirm="confirmWarningMessage"
    />
  </div>
</template>

<script setup>
import DeleteButton from '../Buttons/DeleteButton.vue';
import { useFrame } from '~/stores/frame';
import WarningMessage from './WarningMessage.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, getFirestore } from "firebase/firestore";

const auth = getAuth()
const db = getFirestore()

const dbFrame = useFrame().frame

// Get Id

let userEmail = ref("")
let idUser = ref("")

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      const q = query(collection(db, "users"), where("email", "==", userEmail.value))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        //get user id in firestore
        idUser.value = doc.id
      })

    }
  })
})

const props = defineProps({
  stateModal: Boolean,
  event: Function,
  listId: Number
})

const deleteList = () => {
  dbFrame.splice(props.listId, 1)
  removeListToFirebase(dbFrame)
}

// warning message when deleting the list

let stateWarningMessage = ref(false)
let warningMessage = ref("")

const openWarningMessage = (message) => {
  stateWarningMessage.value = true
  warningMessage.value = message
}

const cancelWarningMessage = () => stateWarningMessage.value = false

// Delete list
const confirmWarningMessage = () => {
  deleteList()  
  stateWarningMessage.value = false
}

const removeListToFirebase = async (list) => {
  const frameDocRef = doc(db, 'users', idUser.value);

  await updateDoc(frameDocRef, {
    frame: list
  })
}

</script>

<style lang="scss" scoped>
  .modal-edit-card {
    position: absolute;
    top: 45px;
    right: -10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.609);
    z-index: 10;
    border: 1px solid rgba(55, 55, 55, 0.998);
  }
</style>