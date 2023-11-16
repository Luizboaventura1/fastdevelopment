<template>
  <AddCardFormRoot
    buttonName="Adicionar nova lista"
    @inputValue="(val) => (newListInput = val)"
    :event="addNewList"
    space
  />
</template>

<script setup>
import AddCardFormRoot from "~/components/Common/Forms/AddCardForm/AddCardFormRoot.vue";
import { useFrame } from "~/stores/frame";

const frames = useFrame().frame;

let props = defineProps({
  indexCard: Number,
  indexFrame: Number,
});

// Add new List

let newListInput = ref("");

const addNewList = () => {
  if (validateCard(newListInput.value)) {
    frames.push({
      title: newListInput.value,
      cards: [],
    });
  }
};

// Validate Card

const validateCard = (description) => {
  description.trim();
  if (description.length === 0) return false;

  return true;
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
