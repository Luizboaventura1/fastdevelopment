<template>
  <div class="flex h-full">
    <VueDraggableNext
      :list="frames[currentPageId]?.lists || []"
      group="lists"
      class="kanban flex flex-row rounded-md gap-3 p-4 h-full"
      @change="useWorkspace().updateWorkspaceData()"
    >
      <KanbanListWrapper v-for="(list, listId) in frames[currentPageId]?.lists || []" :key="listId">
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
                <EditListModal
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
              @change="useWorkspace().updateWorkspaceData()"
            >
              <KanbanCard
                v-for="(card, indexCard) in list.cards"
                :key="card"
                :card="card"
                @click.stop="() => editCard(listId, indexCard)"
              />
            </VueDraggableNext>
          </div>

          <AddCard :listIndex="listId" />
        </KanbanList>
      </KanbanListWrapper>
    </VueDraggableNext>

    <div class="w-[280px] h-auto pt-4">
      <AddList class="bg-secondaryColorF" />
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

import AddCard from "./AddCard.vue";
import AddList from "./AddList.vue";
import EditCard from "./EditCard";
import KanbanCard from "./KanbanCard";
import KanbanList from "./KanbanList";
import KanbanListTitle from "./KanbanList/KanbanListTitle";
import KanbanListWrapper from "./KanbanList/KanbanListWrapper.vue";
import EditListModal from "./EditListModal.vue";
import SettingsButton from "./Buttons/SettingsButton.vue";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import { VueDraggableNext } from "vue-draggable-next";

const route = useRoute();
const currentPageId = useCookie("currentPageId");
const routeId = route.params.id;
currentPageId.value = routeId;

const { frames } = storeToRefs(useWorkspace());
const userId = ref("");
const listAndCardId = ref({ listId: undefined, cardId: undefined });
const stateWarningMessage = ref(false);
const warningMessage = ref("");
const stateModalEditCard = ref(false);
const frameId = ref();
const cardId = ref();
let timeoutId = null;

onMounted(async () => {
  await useWorkspace()
    .fetchWorkspaceData()
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
  if (frames.value[routeId]?.lists[listAndCardId.value.listId]) {
    frames.value[routeId].lists[listAndCardId.value.listId].stateModal = false;
  }
};

const openModalEditList = (indexFrame) => {
  frames.value[routeId].lists[indexFrame].stateModal = true;
  listAndCardId.value.listId = indexFrame;
};

const controlWarningMessage = {
  open: (msg) => {
    stateWarningMessage.value = true;
    warningMessage.value = msg;
  },
  close: () => (stateWarningMessage.value = false),
  confirmWarningMessage: () => {
    useWorkspace().frames[currentPageId.value].lists[listAndCardId.value.listId].cards.splice(
      listAndCardId.value.indexCard,
      1
    );
    useWorkspace().updateWorkspaceData();
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
      useWorkspace().updateWorkspaceData();
      timeoutId = null;
    }, debounceTime);
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
