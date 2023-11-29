<template>
  <button
    @click="props.event"
    class="rounded-md w-full py-2 bg-primaryColorF text-white font-medium text-base"
  >
    <slot />
  </button>
</template>

<script setup>
let props = defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>

button {
  transition: .2s;

  &:hover {
    background-color: #6f4bc3;
  }
}
</style>