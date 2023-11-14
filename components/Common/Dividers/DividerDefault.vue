<template>
  <div
  :class="`px-${spaceX} py-${spaceY}`"
  >
    <hr
      class="w-full h-[1px] my-2 border-zinc-600"
    >
  </div>
</template>

<script setup>
defineProps({
  spaceX: String,
  spaceY: String
})
</script>