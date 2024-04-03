<template>
  <button
    @click.stop="event"
    class="w-full text-sm text-start text-textPrimaryColorF px-3 py-2 cursor-pointer transition-colors"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>
button {
  &:hover {
    background-color: #313135;
  }
}
</style>