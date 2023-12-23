<template>
  <div class="w-full max-w-[300px]">
    <div
      @click="showProjects"
      class="flex items-center w-full h-[40px] cursor-pointer px-2 rounded-lg hover:bg-thirdColorF duration-200 transition-colors"
    >
      <h1 class="font-medium text-sm text-textPrimaryColorF w-full flex items-center gap-3">
        <slot name="icon" />
        {{ props.title }}
      </h1>
      <ArrowButton size="15" :rotate="state" />
    </div>
    <ul
      :style="`height:${state ? totalItems.length * 40 : 0}px;`"
      class="ul-dropdownitem overflow-hidden transition-all duration-300 ps-4"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup>
import ArrowButton from "./ArrowButton.vue";
// 25px os icones

let state = ref(false);

const showProjects = () => {
  state.value = !state.value;
};

let totalItems = ref();

onMounted(() => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
});

watch(state, () => {
  totalItems.value = [...document.querySelectorAll(".ul-dropdownitem li")];
});

const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped></style>
