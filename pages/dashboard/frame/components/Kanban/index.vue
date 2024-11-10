<template>
  <div class="flex h-full">
    <VueDraggableNext
      :list="frames[currentPageId]?.lists || []"
      group="lists"
      class="kanban flex flex-row rounded-md gap-3 p-4 h-full"
      @change="useWorkspace().updateWorkspace()"
    >
      <ListWrapper
        v-for="(list, listId) in frames[currentPageId]?.lists || []"
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
                :card="card"
                @click.stop="() => editCard(listId, indexCard)"
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
import { vOnClickOutside } from "@vueuse/components";
import { storeToRefs } from "pinia";
import { useRoute } from "#vue-router";
import { useWorkspace } from "@/stores/workspace.js";

import AddNewCardContainer from "./AddNewCardContainer.vue";
import AddNewList from "./AddNewList.vue";
import EditCard from "./EditCard";
import KanbanCard from "./KanbanCard";
import KanbanList from "./KanbanList";
import KanbanListTitle from "./KanbanList/KanbanListTitle";
import ListWrapper from "./KanbanList/ListWrapper.vue";
import ModalEditList from "./ModalEditList.vue";
import SettingsButton from "./Buttons/SettingsButton.vue";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import { VueDraggableNext } from "vue-draggable-next";

const route = useRoute();
const currentPageId = useCookie("currentPageId");
const idRoute = route.params.id;
currentPageId.value = idRoute;

let { frames } = storeToRefs(useWorkspace());
let userId = ref("");
let listAndCardId = ref({ listId: undefined, cardId: undefined });
let stateWarningMessage = ref(false);
let warningMessage = ref("");
let stateModalEditCard = ref(false);
let frameId = ref();
let cardId = ref();
let timeoutId = null;

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      userId.value = data.id;
      if (!frames.value.length) {
        frames.value.push(...data.frames);
        resetModalStateForLists();
      }
    });
});

const resetModalStateForLists = () => {
  if (!frames.value) return;
  frames.value.forEach((frame) => {
    frame?.lists?.forEach((list) => {
      list.stateModal = false;
    });
  });
};

const closeModalList = () => {
  if (frames.value[idRoute]?.lists[listAndCardId.value.listId]) {
    frames.value[idRoute].lists[listAndCardId.value.listId].stateModal = false;
  }
};

const openModalEditList = (indexFrame) => {
  frames.value[idRoute].lists[indexFrame].stateModal = true;
  listAndCardId.value.listId = indexFrame;
};

const controlWarningMessage = {
  open: (msg) => {
    stateWarningMessage.value = true;
    warningMessage.value = msg;
  },
  close: () => (stateWarningMessage.value = false),
  confirmWarningMessage: () => {
    useWorkspace().frames[currentPageId.value].lists[
      listAndCardId.value.listId
    ].cards.splice(listAndCardId.value.indexCard, 1);
    useWorkspace().updateWorkspace();
    stateWarningMessage.value = false;
  },
};

const editCard = (indexFrame, indexCard) => {
  frameId.value = indexFrame;
  cardId.value = indexCard;
  useState("frameIndex").value = indexFrame;
  useState("cardIndex").value = indexCard;
  stateModalEditCard.value = true;
};

const updateListName = (listName, listId) => {
  if (validateFrame(listName)) {
    const debounceTime = 2000;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      useWorkspace().frames[currentPageId.value].lists[listId].title = listName;
      useWorkspace().updateWorkspace();
      timeoutId = null;
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
