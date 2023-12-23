<template>
  <nuxt-link :to="props.link">
    <li class="flex items-center text-sm cursor-pointer text-textPrimaryColorF font-medium w-full h-[40px] hover:bg-thirdColorF rounded-lg duration-300 transition-colors p-2">
      <slot />
    </li>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  link: String
})
</script>

<style lang="scss" scoped>

</style>