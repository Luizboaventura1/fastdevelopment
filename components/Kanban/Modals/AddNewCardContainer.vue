<template>
  <AddCardFormRoot
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (titleInput = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardFormRoot from "~/components/Common/Forms/AddCardForm/AddCardFormRoot.vue";
import { useFrame } from "~/stores/frame";

const dbFrame = useFrame().frame;

let props = defineProps({
  indexFrame: Number,
});

// Add new card

let titleInput = ref("");

const addNewCard = () => {
  if (validateCard(titleInput.value)) {
    dbFrame.at(props.indexFrame).cards.push({
      title: titleInput.value,
      description: "",
    });
  }
};
</script>

<style lang="scss" scoped></style>
