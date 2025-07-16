<template>
  <AddCardForm
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (cardTitle = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardForm from "@/components/Common/Forms/AddCardForm/index.vue";
import { useWorkspace } from "@/stores/workspace.js";
import { storeToRefs } from "pinia";
import { isValidCardDescription } from "~/utils/isValidCardDescription";

const currentPageId = useCookie("currentPageId");
const { frames } = storeToRefs(useWorkspace());

const props = defineProps({
  listIndex: Number,
});

const cardTitle = ref("");

const addNewCard = () => {
  if (
    isValidCardDescription(cardTitle.value) &&
    frames.value[currentPageId.value]?.lists.length &&
    props.listIndex >= 0
  ) {
    frames.value[currentPageId.value].lists[props.listIndex].cards.push({
      title: cardTitle.value,
      description: "",
      stateModal: false,
      dateFeatures: {
        date: null,
        complete: null,
      },
      labels: [],
    });
    useWorkspace().updateWorkspaceData();
  }
};
</script>

<style lang="scss" scoped></style>
