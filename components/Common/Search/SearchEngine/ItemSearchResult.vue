<template>
  <nuxt-link :to="props.link">
    <li class="font-medium text-white text-sm w-full py-3 px-5 cursor-pointer hover:bg-secondaryColorF transition-colors duration-200">
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