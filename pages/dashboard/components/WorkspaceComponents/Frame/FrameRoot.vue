<template>
  <nuxt-link :to="`/dashboard/${frameID}`">
    <div
      class="frame cursor-pointer w-full h-[200px] ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all duration-300 rounded-lg p-4"
    >
      <slot />
    </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  frameID: String,
});
</script>

<style lang="scss" scoped>
.frame {
  background-color: #18181a;
}
</style>
