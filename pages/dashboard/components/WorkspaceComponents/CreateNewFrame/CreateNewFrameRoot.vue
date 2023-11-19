<template>
  <div class="frame w-full h-[200px] ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all duration-300 rounded-lg p-4">
    <slot />
  </div>
</template>

<script setup>
let route = useRoute()

</script>

<style lang="scss" scoped>
.frame {
  background-color: #18181a;
}
</style>