<template>
  <div class="flex h-full">
    <VueDraggableNext
      :list="frames[currentPageId]?.frame || []"
      group="lists"
      class="kanban flex flex-row rounded-md gap-3 p-4 h-full"
      @change="useWorkspace().updateWorkspace()"
    >
      <ListWrapper
        v-for="(list, listId) in frames[currentPageId]?.frame || []"
        :key="listId"
      >
        <KanbanList>
          <KanbanListTitle>
            <input
              class="bg-secondaryColorF w-full text-white px-3 py-1 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="list.title"
              @input="updateListName(list.title, listId)"
            />
            <div class="relative">
              <SettingsButton :event="() => openModalEditList(listId)" />
              <div class="absolute bottom-24 right-0">
                <ModalEditList
                  v-on-click-outside="closeModalList"
                  :stateModal="list.stateModal"
                  :event="closeModalList"
                  :listId="listId"
                />
              </div>
            </div>
          </KanbanListTitle>

          <div class="cards overflow-y-auto">
            <VueDraggableNext
              v-model="list.cards"
              group="people"
              @change="useWorkspace().updateWorkspace()"
            >
              <KanbanCard
                v-for="(card, indexCard) in list.cards"
                :key="card"
                @click.stop="() => editCard(listId, indexCard)"
                :cardDescription="card.title"
              />
            </VueDraggableNext>
          </div>

          <AddNewCardContainer :indexFrame="listId" />
        </KanbanList>
      </ListWrapper>
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
    :indexCard="cardId"
    :indexFrame="frameId"
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
import KanbanList from "./components/KanbanList";
import KanbanListTitle from "./components/KanbanList/KanbanListTitle";
import ListWrapper from "./components/KanbanList/ListWrapper.vue";
import KanbanCard from "./components/KanbanCard";
import { useRoute } from "#vue-router";
import { useWorkspace } from "@/stores/workspace.js";

const route = useRoute();
const currentPageId = useCookie("currentPageId");

const idRoute = route.params.id;
currentPageId.value = idRoute;

let frames = useWorkspace().frames;
let userId = ref("");

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      userId.value = data.id;
      // Receives the frames if the array is empty
      if (frames.length === 0) {
        frames.push(...data.frames);
        // Adds modal state to lists and cards
        addModalStateToCardsAndLists();
      }
    });
});

const addModalStateToCardsAndLists = () => {
  frames.forEach((frames) => {
    frames.frame.forEach((list) => {
      list.stateModal = false; // add status to list
      list.cards.forEach((card) => {
        card.stateModal = false; // add status to card
      });
    });
  });
};

// Modal edit card

let listAndCardId = ref({ listId: undefined, cardId: undefined });

//When you click outside the modal it will close
const closeModalList = () => {
  frames[idRoute].frame.at(listAndCardId.value.listId).stateModal = false;
};

const openModalEditList = (indexFrame) => {
  frames[idRoute].frame.at(indexFrame).stateModal = true;
  listAndCardId.value.listId = indexFrame;
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
    frames[idRoute].frame[listAndCardId.value.listId].cards.splice(
      listAndCardId.value.indexCard,
      1
    );

    // Update changes in Firebase
    useWorkspace().updateWorkspace();

    stateWarningMessage.value = false;
  },
};

// Edit Card

/* The edit card function will receive the type of the list and its index,
the EditingCard component will receive this data to edit the selected card */

let stateModalEditCard = ref(false);
let frameId = ref();
let cardId = ref();

const editCard = (indexFrame, indexCard) => {
  frameId.value = indexFrame;
  cardId.value = indexCard;
  useState("frameIndex").value = indexFrame;
  useState("cardIndex").value = indexCard;

  stateModalEditCard.value = true;
};


let timeoutId = null; // Variable to store the current timeout ID

const updateListName = (listName, listId) => {
  if (validateFrame(listName)) {
    const debounceTime = 2000;

    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      useWorkspace().frames[currentPageId.value].frame[listId].title = listName;
      useWorkspace().updateWorkspace();
      timeoutId = null; // Reset the timeout variable
    }, debounceTime);
  }
};

</script>

<style lang="scss" scoped>
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
