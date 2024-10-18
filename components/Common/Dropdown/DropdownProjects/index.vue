<template>
  <div>
    <div
      @click="showProjects"
      class="flex items-center w-full cursor-pointer p-2 rounded-lg hover:bg-thirdColorF duration-200 transition-colors"
    >
      <h1
        class="font-medium text-sm text-textPrimaryColorF whitespace-nowrap w-full flex items-center gap-3"
      >
        <slot name="icon" />
        {{ props.title }}
      </h1>
      <ArrowButton size="12" :rotate="stateDropdownProjects" />
    </div>
    <ul
      :style="`height:${
        stateDropdownProjects ? quantityProjects * itemHeight : 0
      }px;`"
      class="ul-dropdownitem overflow-hidden transition-all duration-300 ps-4 grid grid-cols-1"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ArrowButton from "./ArrowButton.vue";
import { useWorkspace } from "~/stores/workspace";

const props = defineProps({
  title: String,
});

let { frames } = storeToRefs(useWorkspace());
let stateDropdownProjects = useCookie("stateDropdownProjects");
let quantityProjects = useCookie("quantityProjects");
let totalItems = ref([]);
const itemHeight = 36;

const showProjects = () => {
  stateDropdownProjects.value = !stateDropdownProjects.value;
};

onMounted(() => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
});

watch(stateDropdownProjects, () => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
  quantityProjects.value = totalItems.value.length;
});

watch(
  frames.value,
  () => {
    if (frames.value.length !== quantityProjects.value) {
      quantityProjects.value = frames.value.length;
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
