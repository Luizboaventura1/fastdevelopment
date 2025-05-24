<template>
  <button
    @click="props.event"
    class="text-white bg-primaryColorF hover:bg-primaryColorFHover transition-colors duration-200 text-sm font-medium rounded-md px-6 py-2"
  >
    <slot />
  </button>
</template>

<script setup>
let props = defineProps({
  event: Function
})
</script>