<template>
  <div
  :class="`px-${spaceX} py-${spaceY}`"
  >
    <hr
      class="w-full h-[1px] border-thirdBorderF"
    >
  </div>
</template>

<script setup>
defineProps({
  spaceX: String,
  spaceY: String
})
</script>