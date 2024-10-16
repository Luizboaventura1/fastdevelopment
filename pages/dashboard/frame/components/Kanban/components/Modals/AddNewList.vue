<template>
  <AddCardForm
    buttonName="Adicionar nova lista"
    @inputValue="(val) => (newListInput = val)"
    :event="addNewList"
    space
  />
</template>

<script setup>
import AddCardForm from "~/components/Common/Forms/AddCardForm";
import { useWorkspace } from "@/stores/workspace.js"

const currentPageId = useCookie("currentPageId")

const frames = useWorkspace().frames;

let props = defineProps({
  indexCard: Number,
  indexFrame: Number,
});

// Add new List

let newListInput = ref("");

const addNewList = () => {
  if (validateCard(newListInput.value)) {
    frames[currentPageId.value].frame.push({
      title: newListInput.value,
      stateModal: false,
      cards: [],
    });
  }

  useWorkspace().updateWorkspace()
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
