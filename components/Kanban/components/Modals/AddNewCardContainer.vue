<template>
  <AddCardFormRoot
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (titleInput = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardFormRoot from "~/components/Common/Forms/AddCardForm/AddCardFormRoot.vue";
import { useWorkspace } from "@/stores/workspace.js"

const currentPageId = useCookie("currentPageId")

const frames = useWorkspace().frames;
let frameList = ref(frames[currentPageId.value].frame)

let props = defineProps({
  indexFrame: Number,
});

// Add new card

let titleInput = ref("");

const addNewCard = () => {
  if (validateCard(titleInput.value)) {
    frameList.value[props.indexFrame].cards.push({
      title: titleInput.value,
      description: "",
      labels: []
    });
  }
};
</script>

<style lang="scss" scoped></style>
