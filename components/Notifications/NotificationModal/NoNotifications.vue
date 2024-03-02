<template>
  <div
    v-if="state"
    class="p-5"
  >
    <img
      src="../../../assets/void.svg.svg"
      alt="No notifications"
      class="m-auto w-[140px]"
    >
    <h1
      class="mt-5 text-center text-white text-sm"
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