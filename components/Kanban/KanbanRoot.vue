<template>
  <div class="flex h-full">
    <VueDraggableNext
      :list="frames[currentPageId]?.frame || []"
      group="lists"
      class="kanban flex flex-row rounded-md gap-3 p-4 h-full"
    >
      <div
        v-for="(frame, indexFrame) in frames[currentPageId]?.frame || []"
        :key="indexFrame"
        class="me-2 w-[280px] h-full"
      >
        <div
          class="lista grid grid-rows-[auto,1fr,auto] max-h-full w-full relative me-3 bg-subSecondaryColorF p-3 rounded-lg"
        >
          <div class="title-container py-2 flex items-center gap-4">
            <input
              class="bg-subSecondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="frame.title"
              @input="updateFrameInFirebase"
            />
            <div class="relative">
              <SettingsButton :event="() => openModalEditList(indexFrame)" />
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
          <div class="cards overflow-y-auto">
            <VueDraggableNext v-model="frame.cards" group="people">
              <CardRoot
                v-for="(card, indexCard) in frame.cards"
                :key="card"
                @click.stop="() => editCard(indexFrame, indexCard)"
              >
                <CardTitle>
                  {{ card.title }}
                </CardTitle>
                <div class="edit-card h-full flex items-center absolute top-0 right-3">
                  <EditCardButton
                    @editCard="openModalEditCard(indexFrame, indexCard)"
                  />
                  <OptionsModalRoot
                    class="-mt-11"
                    v-on-click-outside="closeCard"
                    :stateModal="card.stateModal"
                  >
                    <template #nav>
                      <TitleOptionsModal> Ações card </TitleOptionsModal>
                      <CloseButton :event="closeCard" size="15" />
                    </template>
                    <template #buttons>
                      <ActionOptionsModal
                        :event="() => editCard(indexFrame, indexCard)"
                      >
                        Editar
                      </ActionOptionsModal>
                      <ActionOptionsModal
                        :event="
                          () => controlWarningMessage.open('Apagar o cartão?')
                        "
                      >
                        Excluir
                      </ActionOptionsModal>
                    </template>
                  </OptionsModalRoot>
                </div>
              </CardRoot>
            </VueDraggableNext>
          </div>
          <AddNewCardContainer :indexFrame="indexFrame" />
        </div>
      </div>
    </VueDraggableNext>
    <div class="add-new-frame w-[280px] h-auto pt-4">
      <AddNewList />
    </div>
  </div>

  <WarningMessage
    :state="stateWarningMessage"
    :message="warningMessage"
    :cancel="controlWarningMessage.close"
    :confirm="controlWarningMessage.confirmWarningMessage"
  />
  <EditCardRoot
    :stateModal="stateModalEditCard"
    :indexCard="idCard"
    :indexFrame="idFrame"
    :closeModalBtn="() => (stateModalEditCard = false)"
    @closeModal="stateModalEditCard = false"
  />
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import { vOnClickOutside } from "@vueuse/components";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import EditCardRoot from "./components/EditCard/EditCardRoot.vue";
import AddNewCardContainer from "./components/Modals/AddNewCardContainer.vue";
import AddNewList from "./components/Modals/AddNewList.vue";
import SettingsButton from "./components/Buttons/SettingsButton.vue";
import ModalEditList from "./components/Modals/ModalEditList.vue";
import CardRoot from "./components/Card/CardRoot.vue";
import CardTitle from "./components/Card/CardTitle.vue"
import {
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import OptionsModalRoot from "../Common/Popups/OptionsModal/OptionsModalRoot.vue";
import ActionOptionsModal from "../Common/Popups/OptionsModal/ActionOptionsModal.vue";
import TitleOptionsModal from "../Common/Popups/OptionsModal/TitleOptionsModal.vue";
import CloseButton from "../Common/FeedBack/CloseButton.vue";
import EditCardButton from "./components/Card/EditCardButton.vue";
import { useRoute } from "#vue-router";
import { useWorkspace } from "@/stores/workspace.js"

const route = useRoute();
const currentPageId = useCookie("currentPageId");

const idRoute = route.params.id;
currentPageId.value = idRoute;

const db = getFirestore();
let frames = useWorkspace().frames;
let idUser = ref("");

onMounted(async () => {
  await useWorkspace().workspace()
  .then(data => {
    idUser.value = data.id
    if (frames.length === 0) {
      frames.push(...data.frames)
      addModalStateToCards()
    }
  })
})

const addModalStateToCards = () => {
  frames.forEach((framesArr) => {
    framesArr.frame.forEach((frameArr) => {
      frameArr.stateModal = false; // add status to list
      frameArr.cards.forEach((card) => {
        card.stateModal = false; // add status to card
      });
    });
  });
};

// Modal edit card

let currentIndexCard = ref({ indexFrame: undefined, indexCard: undefined });

//When you click outside the modal it will close
const closeCard = () =>
  (frames[idRoute].frame
    .at(currentIndexCard.value.indexFrame)
    .cards.at(currentIndexCard.value.indexCard).stateModal = false);

const closeModalList = () =>
  (frames[idRoute].frame.at(
    currentIndexCard.value.indexFrame
  ).stateModal = false);

/*
  The function below openModalEditCard  receives the name of the list and the card index, 
  when clicking on the pencil it will open a modal with the edit and delete buttons
  and the currentIndexCard will receive the index to close the card modal if you click outside it.
*/

const openModalEditCard = (indexFrame, indexCard) => {
  // Open the card modal
  frames[idRoute].frame.at(indexFrame).cards.at(indexCard).stateModal = true;

  currentIndexCard.value.indexFrame = indexFrame;
  currentIndexCard.value.indexCard = indexCard;
};

const openModalEditList = (indexFrame) => {
  frames[idRoute].frame.at(indexFrame).stateModal = true;
  currentIndexCard.value.indexFrame = indexFrame;
};

// Warning message Card

let stateWarningMessage = ref(false);
let warningMessage = ref("");

let controlWarningMessage = {
  open: (msg) => {
    stateWarningMessage.value = true;
    warningMessage.value = msg;
  },
  close: () => (stateWarningMessage.value = false),
  confirmWarningMessage: () => {
    frames[idRoute].frame
      .at(currentIndexCard.value.indexFrame)
      .cards.splice(currentIndexCard.value.indexCard, 1);

    // Update list in Firebase
    updateFrameInFirebase();

    stateWarningMessage.value = false;
  },
};

// Edit Card

/* The edit card function will receive the type of the list and its index,
the EditingCard component will receive this data to edit the selected card */

let stateModalEditCard = ref(false);
let idFrame = ref();
let idCard = ref();

const editCard = (indexFrame, indexCard) => {
  idFrame.value = indexFrame;
  idCard.value = indexCard;
  useState("indexFrame").value = indexFrame;
  useState("indexCard").value = indexCard;

  stateModalEditCard.value = true;
};

// Update the list in firebase when changing card position

const updateFrameInFirebase = async () => {
  const frameDocRef = doc(db, "users", idUser.value);

  await updateDoc(frameDocRef, {
    workspace: frames,
  });
};

watch(frames, () => {
  // any changes already updated in firebase
  updateFrameInFirebase();
});
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
        transition: 0.2s;

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
    transition: 0.3s;
    &:hover {
      background-color: #8257e5;
    }
  }
}

.kanban {
  .lista {
    border: 1px solid #393939;
    transition: 0.3s;
    &:hover {
      border: 1px solid #575757;
    }
  }
}

.add-new-frame div {
  border: 1px solid #393939;
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
