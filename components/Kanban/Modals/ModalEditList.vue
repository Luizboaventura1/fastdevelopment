<template>
  <div>
    <OptionsModalRoot
      :stateModal="props.stateModal"
    >
      <template #nav>
        <TitleOptionsModal>
          Ações lista
        </TitleOptionsModal>
        <CloseButton
          :event="props.event"
          size="16"
        />
      </template>

      <template #buttons>
        <ActionOptionsModal
          :event="() => openWarningMessage('Apagar lista?')"
        >
          Excluir
        </ActionOptionsModal>
      </template>

    </OptionsModalRoot>

    <WarningMessage
      :state="stateWarningMessage"
      :message="warningMessage"
      :cancel="cancelWarningMessage"
      :confirm="confirmWarningMessage"
    />
  </div>
</template>

<script setup>
import { useFrame } from '~/stores/frame';
import WarningMessage from './WarningMessage.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, getFirestore } from "firebase/firestore";
import OptionsModalRoot from '@/components/Common/Popups/OptionsModal/OptionsModalRoot.vue';
import ActionOptionsModal from '@/components/Common/Popups/OptionsModal/ActionOptionsModal.vue';
import TitleOptionsModal from '@/components/Common/Popups/OptionsModal/TitleOptionsModal.vue';
import CloseButton from '@/components/Common/FeedBack/CloseButton.vue';

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