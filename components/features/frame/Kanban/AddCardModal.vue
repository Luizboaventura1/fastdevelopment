<template>
  <AddCardForm
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (cardTitle = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardForm from "@/components/common/Forms/AddCardForm/index.vue";
import { useWorkspace } from "@/stores/workspace.js";
import { storeToRefs } from "pinia";
import { validateCard } from "@/utils/validateCard";

const currentPageId = useCookie("currentPageId");
const { frames } = storeToRefs(useWorkspace());

const props = defineProps({
  listIndex: Number,
});

const cardTitle = ref("");

const addNewCard = () => {
  if (
    validateCard(cardTitle.value) &&
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
