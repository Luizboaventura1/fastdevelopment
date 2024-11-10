<template>
  <AddCardForm
    buttonName="Adicionar nova lista"
    @inputValue="(val) => (listTitle = val)"
    :event="addNewList"
    space
  />
</template>

<script setup>
import AddCardForm from "~/components/Common/Forms/AddCardForm";
import { useWorkspace } from "@/stores/workspace.js";
import { storeToRefs } from "pinia";

const currentPageId = useCookie("currentPageId");
const { frames } = storeToRefs(useWorkspace());

const props = defineProps({
  indexCard: Number,
  indexFrame: Number,
});

const listTitle = ref("");

const addNewList = () => {
  if (validateCard(listTitle.value) && frames.value[currentPageId.value]?.lists) {
    frames.value[currentPageId.value].lists.push({
      title: listTitle.value, 
      stateModal: false,
      cards: [],
    });
    useWorkspace().updateWorkspace();
  }
};
</script>

<style lang="scss" scoped>
.add-new-card {
  transition: 0.3s;
  &:hover {
    background-color: #000000;
  }
}
</style>
