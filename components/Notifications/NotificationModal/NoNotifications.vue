<template>
  <div
    v-if="state"
    class="p-5"
  >
    <img
      src="../../../assets/void.svg.svg"
      alt="No notifications"
      class="m-auto"
    >
    <h1
      class="font-medium mt-5 text-center text-white"
    >
      <slot />  
    </h1>
  </div>
</template>

<script setup>
defineProps({
  state: Boolean
})
</script>