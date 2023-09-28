<template>
  <button
    class="w-full text-white rounded-md py-3 bg-primaryColorF font-bold"
    @click.prevent="props.event"
  >
    <slot />
  </button>
</template>

<script setup>
let props = defineProps({
  event: Function
})
</script>

<style scoped lang="scss">
button {
  transition: .2s;
  &:hover {
    background-color: #8c67e3;
  }
}
</style>