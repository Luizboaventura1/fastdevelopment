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
          class="lista grid grid-rows-[auto,1fr,auto] max-h-full w-full relative me-3 bg-secondaryColorF p-3 rounded-lg"
        >

          <div class="title-container py-2 flex items-center gap-4">
            <input
              class="bg-secondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
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
              <Card
                v-for="(card, indexCard) in frame.cards"
                :key="card"
                @click.stop="() => editCard(indexFrame, indexCard)"
              >
                {{ card.title }}
              </Card>
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
  <EditCard
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
import EditCard from "./components/EditCard";
import AddNewCardContainer from "./components/Modals/AddNewCardContainer.vue";
import AddNewList from "./components/Modals/AddNewList.vue";
import SettingsButton from "./components/Buttons/SettingsButton.vue";
import ModalEditList from "./components/Modals/ModalEditList.vue";
import Card from "./components/Card";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useRoute } from "#vue-router";
import { useWorkspace } from "@/stores/workspace.js";

const route = useRoute();
const currentPageId = useCookie("currentPageId");

const idRoute = route.params.id;
currentPageId.value = idRoute;

const db = getFirestore();
let frames = useWorkspace().frames;
let idUser = ref("");

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      idUser.value = data.id;
      if (frames.length === 0) {
        frames.push(...data.frames);
        addModalStateToCards();
      }
    });
});

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
const closeModalList = () => {
  frames[idRoute].frame.at(currentIndexCard.value.indexFrame).stateModal = false;
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
