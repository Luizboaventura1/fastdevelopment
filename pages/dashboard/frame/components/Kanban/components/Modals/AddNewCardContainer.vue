<template>
  <AddCardForm
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (titleInput = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardForm from "@/components/Common/Forms/AddCardForm/index.vue";
import { useWorkspace } from "@/stores/workspace.js"

const currentPageId = useCookie("currentPageId")

let lists = useWorkspace().frames[currentPageId.value].frame

let props = defineProps({
  indexFrame: Number,
});

// Add new card

let titleInput = ref("");

const addNewCard = () => {
  if (validateCard(titleInput.value)) {
    lists[props.indexFrame].cards.push({
      title: titleInput.value,
      description: "",
      labels: []
    });

    useWorkspace().updateWorkspace()
  }
};
</script>

<style lang="scss" scoped></style>
