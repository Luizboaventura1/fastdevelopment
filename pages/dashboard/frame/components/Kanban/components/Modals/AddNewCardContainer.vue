<template>
  <AddCardForm
    buttonName="Adicionar novo cartão"
    @inputValue="(val) => (titleInput = val)"
    :event="addNewCard"
  />
</template>

<script setup>
import AddCardForm from "@/components/Common/Forms/AddCardForm/index.vue";
import { useWorkspace } from "@/stores/workspace.js";

const currentPageId = useCookie("currentPageId");
let lists = ref(useWorkspace().frames[currentPageId.value]?.frame || []);

onMounted(async () => {
  if (!lists.value.length) {
    await useWorkspace()
      .workspace()
      .then((data) => {
        useWorkspace().frames = data.frames;
        lists.value = useWorkspace().frames[currentPageId.value].frame;
      });
  }
});

let props = defineProps({
  indexFrame: Number,
});

// Add new card

let titleInput = ref("");

const addNewCard = () => {
  if (validateCard(titleInput.value) && lists.value.length) {
    lists.value[props.indexFrame].cards.push({
      title: titleInput.value,
      description: "",
      stateModal: false,
      labels: [],
    });

    useWorkspace().updateWorkspace();
  }
};
</script>

<style lang="scss" scoped></style>
