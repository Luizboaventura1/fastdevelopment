<template>
  <div class="bg-secondaryColorF">
    <div class="kanban flex flex-row rounded-md gap-3 p-4">
      <!--List A-->
      <div class="me-2 w-[350px]">
        <div class="list-a h-auto w-full me-3 bg-subSecondaryColorF p-3 rounded-lg">
          <div class="title-container py-2">
            <input
              class="bg-subSecondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="toDoListTitle"
            >
          </div>
          <div
            class="cards"
          >
            <VueDraggableNext
              v-model="listA"
              group="people"
            >
              <transition-group>
                <div
                  v-for="(card,index) in listA"
                  :key="card"
                  class="card flex items-center cursor-pointer w-full bg-secondaryColorF hover:bg-zinc-800 p-1 rounded-lg h-[50px] my-2"
                >
                  <div class="text-white px-3 truncate w-full max-w-xs">{{ card.title }}</div>
                  <div class="edit-card h-full flex items-center">
                    <div
                      @click="openModalEditCard('listA',index)"
                      class="edit-card-button w-[35px] h-[35px] flex items-center justify-center rounded-lg"
                    >
                      <svg class="w-[19px] h-[19px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M1.172 19.119A4 4 0 0 0 0 21.947V24h2.053a4 4 0 0 0 2.828-1.172L18.224 9.485l-3.709-3.709ZM23.145.855a2.622 2.622 0 0 0-3.71 0l-3.506 3.507 3.709 3.709 3.507-3.506a2.622 2.622 0 0 0 0-3.71Z" opacity="1" data-original="#000000" class=""></path></g></svg>
                    </div>
                    <ModalEditCard
                      v-on-click-outside="closeCard"
                      :stateModal="card.stateModal"
                      :deleteBtn="handleWarningMessage"
                      :edit="editCard"
                    />
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
            <AddNewCardContainer
              typeList="listA"
            />
          </div>
        </div>
      </div>

      <!--List B-->
      <div class="me-2 w-[350px]">
        <div class="list-a h-auto w-full me-3 bg-subSecondaryColorF p-3 rounded-lg">
          <div class="title-container py-2">
            <input
              class="bg-subSecondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="listTitleInProgress"
            >
          </div>
          <div
            class="cards"
          >
            <VueDraggableNext
              v-model="listB"
              group="people"
            >
              <transition-group>
                <div
                  v-for="(card,index) in listB"
                  :key="card"
                  class="card flex items-center cursor-pointer w-full bg-secondaryColorF hover:bg-zinc-800 p-1 rounded-lg h-[50px] my-2"
                >
                  <div class="text-white px-3 truncate w-full max-w-xs">{{ card.title }}</div>
                  <div class="edit-card h-full flex items-center">
                    <div
                      @click="openModalEditCard('listB',index)"
                      class="edit-card-button w-[35px] h-[35px] flex items-center justify-center rounded-lg"
                    >
                      <svg class="w-[19px] h-[19px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M1.172 19.119A4 4 0 0 0 0 21.947V24h2.053a4 4 0 0 0 2.828-1.172L18.224 9.485l-3.709-3.709ZM23.145.855a2.622 2.622 0 0 0-3.71 0l-3.506 3.507 3.709 3.709 3.507-3.506a2.622 2.622 0 0 0 0-3.71Z" opacity="1" data-original="#000000" class=""></path></g></svg>
                    </div>
                    <ModalEditCard
                      v-on-click-outside="closeCard"
                      :stateModal="card.stateModal"
                      :deleteBtn="handleWarningMessage"
                      :edit="editCard"
                    />
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
            <AddNewCardContainer
              typeList="listB"
            />
          </div>
        </div>
      </div>

      
      <!--List C-->
      <div class="w-[350px]">
        <div class="list-a h-auto w-full bg-subSecondaryColorF p-3 rounded-lg">
          <div class="title-container py-2">
            <input
              class="bg-subSecondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="lisTitleDone"
            >
          </div>
          <div
            class="cards"
          >
            <VueDraggableNext
              v-model="listC"
              group="people"
            >
              <transition-group>
                <div
                  v-for="(card,index) in listC"
                  :key="card"
                  class="card flex items-center cursor-pointer w-full bg-secondaryColorF hover:bg-zinc-800 p-1 rounded-lg h-[50px] my-2"
                >
                  <div class="text-white px-3 truncate w-full max-w-xs">{{ card.title }}</div>
                  <div class="edit-card h-full flex items-center">
                    <div
                      @click="openModalEditCard('listC',index)"
                      class="edit-card-button w-[35px] h-[35px] flex items-center justify-center rounded-lg"
                    >
                      <svg class="w-[19px] h-[19px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M1.172 19.119A4 4 0 0 0 0 21.947V24h2.053a4 4 0 0 0 2.828-1.172L18.224 9.485l-3.709-3.709ZM23.145.855a2.622 2.622 0 0 0-3.71 0l-3.506 3.507 3.709 3.709 3.507-3.506a2.622 2.622 0 0 0 0-3.71Z" opacity="1" data-original="#000000" class=""></path></g></svg>
                    </div>
                    <ModalEditCard
                      v-on-click-outside="closeCard"
                      :stateModal="card.stateModal"
                      :deleteBtn="handleWarningMessage"
                      :edit="() => editCard('listC',index)"
                    />
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
            <AddNewCardContainer
              typeList="listC"
            />
          </div>
        </div>
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
    :index="indexCard"
    :list="listTypeCard"
    :closeModalBtn="() => stateModalEditCard = false"
    @closeModal="stateModalEditCard = false"
  />
</template>

<script setup>
import { VueDraggableNext } from 'vue-draggable-next';
import ModalEditCard from './ModalEditCard.vue';
import { vOnClickOutside } from '@vueuse/components'
import WarningMessage from './Modals/WarningMessage.vue';
import EditingCard from './EditingCard.vue'
import AddNewCardContainer from './AddNewCardContainer.vue'

// Title Todos

let toDoListTitle = ref('Para fazer ')
let listTitleInProgress = ref('Em progresso')
let lisTitleDone = ref('Feito')

let listA = ref([
  {title: 'Card 1',stateModal: false},
  {title: 'Card 2',stateModal: false},

])

let listB = ref([])
let listC = ref([
  {title: 'Pagar agiota',stateModal: false},
])

// Modal edit card

let currentIndexCard = ref({index: undefined, list: undefined})

//When you click outside the modal it will close
const closeCard = () => {
  if (currentIndexCard.value.list === 'A') 
    listA.value.at(currentIndexCard.value.index).stateModal = false

  else if (currentIndexCard.value.list === 'B') 
    listB.value.at(currentIndexCard.value.index).stateModal = false

  else if (currentIndexCard.value.list === 'C') 
    listC.value.at(currentIndexCard.value.index).stateModal = false
}

/*
  The function below openModalEditCard  receives the name of the list and the card index, 
  when clicking on the pencil it will open a modal with the edit and delete buttons
  and the currentIndexCard will receive the index to close the card modal if you click outside it.
*/

const openModalEditCard = (listName, index) => {

  if (listName === 'listA') {
    listA.value.at(index).stateModal = !listA.value.at(index).stateModal
    currentIndexCard.value.index = index
    currentIndexCard.value.list = 'A'

  } else if (listName === 'listB') {
    listB.value.at(index).stateModal = !listB.value.at(index).stateModal
    currentIndexCard.value.index = index
    currentIndexCard.value.list = 'B'

  } else if (listName === 'listC') {
    listC.value.at(index).stateModal = !listC.value.at(index).stateModal
    currentIndexCard.value.index = index
    currentIndexCard.value.list = 'C'

  }

}

// Warning message

let stateWarningMessage = ref(false)
let warningMessage = ref("")

// open modal to cancel or confirm the action on the card 
const handleWarningMessage = () => {
  openWarningMessage('Apagar o cartão?')
}

const openWarningMessage = (message) => {
  stateWarningMessage.value = true
  warningMessage.value = message
}

const cancelWarningMessage = () => stateWarningMessage.value = false

const confirmWarningMessage = () => {
  alert('Foi!')
}

// Edit Card

/*
The edit card function will receive the type of the list and its index,
the EditingCard component will receive this data to edit the selected card
*/

let stateModalEditCard = ref(false)
let listTypeCard = ref("")
let indexCard = ref()

const editCard = (listType,index) => {
  stateModalEditCard.value = true

  listTypeCard.value = listType
  indexCard.value = index
}

</script>

<style lang="scss" scoped>
.cards {
  .card {
    position: relative;

    &:hover {
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