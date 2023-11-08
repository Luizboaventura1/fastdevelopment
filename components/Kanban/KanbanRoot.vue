<template>
  <div class="bg-secondaryColorF">
    <div class="kanban flex flex-row rounded-md gap-3 p-4">

      <div
        v-for="(frame,indexFrame) in frames"
        :key="frame"
        class="me-2 w-[280px]"
      >
        <div class="h-auto w-full me-3 bg-subSecondaryColorF p-3 rounded-lg">
          <div class="title-container py-2 flex items-center gap-4">
            <input
              class="bg-subSecondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="frame.title"
              @input="updateTitleFrame(frame.title,indexFrame)"
            >
            <div class="relative">
              <SettingsButton
                :event="() => openModalEditList(indexFrame)"
              />
              <div class="absolute bottom-24 right-0">
                <ModalEditList
                  v-on-click-outside="closeModalList"
                  :stateModal="frame.stateModal"
                  :event="closeModalList"
                  :listId="indexFrame"
                />
              </div>
            </div>
          </div>
          <div
            class="cards"
          >
            <VueDraggableNext
              v-model="frame.cards"
              group="people"
            >
              <transition-group>
                <div
                  v-for="(card,indexCard) in frame.cards"
                  :key="card"
                  @click.stop="() => editCard(indexFrame, indexCard)"
                  class="card flex items-center cursor-pointer w-full bg-secondaryColorF p-1 rounded-lg h-[40px] my-2"
                >
                  <div class="text-white text-sm px-3 truncate w-full max-w-xs">{{ card.title }}</div>
                  <div class="edit-card h-full flex items-center">
                    <div
                      @click.stop="openModalEditCard(indexFrame,indexCard)"
                      class="edit-card-button w-[28px] h-[28px] flex items-center justify-center rounded-lg"
                    >
                      <svg class="w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M1.172 19.119A4 4 0 0 0 0 21.947V24h2.053a4 4 0 0 0 2.828-1.172L18.224 9.485l-3.709-3.709ZM23.145.855a2.622 2.622 0 0 0-3.71 0l-3.506 3.507 3.709 3.709 3.507-3.506a2.622 2.622 0 0 0 0-3.71Z" opacity="1" data-original="#000000" class=""></path></g></svg>
                    </div>
                    <ModalEditCard
                      v-on-click-outside="closeCard"
                      :stateModal="card.stateModal"
                      :deleteBtn="() => openWarningMessage('Apagar o cartão?')"
                      :edit="() => editCard(indexFrame,indexCard)"
                      :event="closeCard"
                    />
                    
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
            <AddNewCardContainer
              :indexFrame="indexFrame"
            />
          </div>
        </div>
      </div>
      <div class="add-new-frame w-[300px]">
        <AddNewList />
      </div>

    </div>
  </div>

  <WarningMessage
    :state="stateWarningMessage"
    :message="warningMessage"
    :cancel="cancelWarningMessage"
    :confirm="confirmWarningMessage"
  />
  <EditingCard 
    :stateModal="stateModalEditCard"
    :indexCard="idCard"
    :indexFrame="idFrame"
    :closeModalBtn="() => stateModalEditCard = false"
    @closeModal="stateModalEditCard = false"
  />
</template>

<script setup>
import { VueDraggableNext } from 'vue-draggable-next';
import ModalEditCard from './Modals/ModalEditCard.vue';
import { vOnClickOutside } from '@vueuse/components'
import WarningMessage from './Modals/WarningMessage.vue';
import EditingCard from './Modals/EditingCard.vue'
import AddNewCardContainer from './Modals/AddNewCardContainer.vue'
import AddNewList from './Modals/AddNewList.vue'
import { useFrame } from '~/stores/frame';
import SettingsButton from './Buttons/SettingsButton.vue';
import ModalEditList from './Modals/ModalEditList.vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs,doc, updateDoc } from "firebase/firestore";


let frames = useFrame().frame
let userEmail = ref("")
let idUser = ref("")


onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      // get frame

      const q = query(collection(db, "users"), where("email", "==", userEmail.value))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        // add data to local frame
        if (frames.length === 0) {
          frames.push(...doc.data().frame)
        }
        

        addModalStateToCards()

        // get user id from firestore
        idUser.value = doc.id
      })
    }
  })
})

// add the modal state to cards

const addModalStateToCards = () => {
  frames.forEach(frame => {
    
    frame.stateModal = false // add status to list

    frame.cards.forEach(card => {
      card.stateModal = false // add status to card
    })

  })
}

// Modal edit card

let currentIndexCard = ref({indexFrame: undefined, indexCard: undefined})

//When you click outside the modal it will close
const closeCard = () => frames.at(currentIndexCard.value.indexFrame).cards.at(currentIndexCard.value.indexCard).stateModal = false

const closeModalList = () => frames.at(currentIndexCard.value.indexFrame).stateModal = false


/*
  The function below openModalEditCard  receives the name of the list and the card index, 
  when clicking on the pencil it will open a modal with the edit and delete buttons
  and the currentIndexCard will receive the index to close the card modal if you click outside it.
*/

const openModalEditCard = (indexFrame, indexCard) => {

  frames.at(indexFrame).cards.at(indexCard).stateModal = true
  currentIndexCard.value.indexFrame = indexFrame
  currentIndexCard.value.indexCard = indexCard

}

const openModalEditList = (indexFrame) => {
  frames.at(indexFrame).stateModal = true
  currentIndexCard.value.indexFrame = indexFrame
}

// Warning message Card

let stateWarningMessage = ref(false)
let warningMessage = ref("")

const openWarningMessage = (message) => {
  stateWarningMessage.value = true
  warningMessage.value = message
}

const cancelWarningMessage = () => stateWarningMessage.value = false

const confirmWarningMessage = () => {
  frames.at(currentIndexCard.value.indexFrame).cards.splice(currentIndexCard.value.indexCard, 1)

  // Update list in Firebase
  updateFrameInFirebase()
  
  stateWarningMessage.value = false
}

// Edit Card

/* The edit card function will receive the type of the list and its index,
the EditingCard component will receive this data to edit the selected card */

let stateModalEditCard = ref(false)
let idFrame = ref()
let idCard = ref()

const editCard = (indexFrame, indexCard) => {
  idFrame.value = indexFrame
  idCard.value = indexCard
  
  stateModalEditCard.value = true
}

const updateTitleFrame = (title, indexFrame) => {
  frames.at(indexFrame).title = title

  const frameDocRef = doc(db, 'users', idUser.value);

  updateDoc(frameDocRef, {
    frame: frames
  })
}

// Update the list in firebase when changing card position

const updateFrameInFirebase = async () => {
  const frameDocRef = doc(db, 'users', idUser.value);

  await updateDoc(frameDocRef, {
    frame: frames
  })
}

watch(frames,() => { // any changes already updated in firebase
  updateFrameInFirebase()
})

</script>

<style lang="scss" scoped>
.cards {
  .card {
    position: relative;

    &:hover {
      background-color: #252529;
      .edit-card-button {
        display: flex !important;
      }
    }

    .edit-card { 
      position: absolute;
      right: 10px;
      top: 0;

      .edit-card-button {
        display: none;
        transition: .2s;

        svg {
          fill: #b4b4b4;
        }

        &:hover {
          background-color: #1a1a1d;
          
          svg {
            fill: #ffffff;
          }
        }
      }
    }
  }
}

.container-add-new-card {
  .add-new-card-btn {
    transition: .3s;
    &:hover {
      background-color: #8257e5;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
  background-color: rgb(33, 34, 36);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(56, 58, 60);
  border-radius: 10px;
  border: 2px solid rgb(33, 34, 36);
}
</style>