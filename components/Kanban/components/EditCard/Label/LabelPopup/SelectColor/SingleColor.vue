<template>
  <button
    :style="`background-color: ${props.color};`"
    class="h-[35px] truncate cursor-pointer rounded-md w-full shadow shadow-black px-4 text-start"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: String,
});
</script>
