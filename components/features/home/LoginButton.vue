<template>
  <button
    @click="props.event"
    class="text-white text-sm font-bold rounded-md px-4 py-2"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
$primary-color: #8257e5;
$secondary-color: #202024;
$sub-secondary-color: #121214;

button {
  border: 1px solid $primary-color;
  transition: .2s;
  &:hover {
    background-color: $primary-color;
  }
}
</style>

<script setup>
let props = defineProps({
  event: Function
})
</script>