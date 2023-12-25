<template>
  <div class="w-full max-w-[300px]">
    <div
      @click="showProjects"
      class="flex items-center w-full h-[40px] cursor-pointer px-2 rounded-lg hover:bg-thirdColorF duration-200 transition-colors"
    >
      <h1
        class="font-medium text-sm text-textPrimaryColorF w-full flex items-center gap-3"
      >
        <slot name="icon" />
        {{ props.title }}
      </h1>
      <ArrowButton size="15" :rotate="stateDropdownProjects" />
    </div>
    <ul
      :style="`height:${stateDropdownProjects ? quantityProjects * 40 : 0}px;`"
      class="ul-dropdownitem overflow-hidden transition-all duration-300 ps-4"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup>
import ArrowButton from "./ArrowButton.vue";

let stateDropdownProjects = useCookie("stateDropdownProjects");
let quantityProjects = useCookie("quantityProjects");

const showProjects = () => {
  stateDropdownProjects.value = !stateDropdownProjects.value;
};

let totalItems = ref([]);

onMounted(() => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
});

watch(stateDropdownProjects, () => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
  quantityProjects.value = totalItems.value.length
});

const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped></style>
