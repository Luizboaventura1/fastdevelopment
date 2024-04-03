<template>
  <nuxt-link :to="link">
    <button
      class="link text-sm w-full text-start text-textPrimaryColorF px-3 py-2 cursor-pointer transition-colors"
    >
      <slot />
    </button>
  </nuxt-link>
</template>

<script setup>
defineProps({
  link: String,
});
</script>

<style lang="scss" scoped>
.link {
  &:hover {
    background-color: #313135;
  }
}
</style>
