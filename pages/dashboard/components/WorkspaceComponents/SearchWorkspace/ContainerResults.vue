<script setup>
const props = defineProps({
  state: Boolean
})
</script>

<template>
  <ul
    v-if="props.state"
    class="results absolute z-20 w-full left-0 top-9 bg-subSecondaryColorF rounded-lg overflow-x-hidden overflow-y-auto max-h-[300px]"
  >
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.results {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.402);
  border: 1px solid rgb(58, 58, 58);
}


::-webkit-scrollbar {
  width: 0;
}
</style>
