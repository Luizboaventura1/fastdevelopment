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

const currentPageId = useCookie("currentPageId");
const { frames } = storeToRefs(useWorkspace());

const props = defineProps({
  indexFrame: Number,
});

const cardTitle = ref("");

const addNewCard = () => {
  if (
    validateCard(cardTitle.value) &&
    frames.value[currentPageId.value]?.lists.length &&
    props.indexFrame >= 0
  ) {
    frames.value[currentPageId.value].lists[props.indexFrame].cards.push({
      title: cardTitle.value,
      description: "",
      stateModal: false,
      dateFeatures: {
        date: null,
        complete: null,
      },
      labels: [],
    });
    useWorkspace().updateWorkspace();
  }
};
</script>

<style lang="scss" scoped></style>
