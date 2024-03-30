<template>
  <nuxt-link :to="link">
    <div
      class="item-aside flex items-center cursor-pointer gap-3 p-2 rounded-lg transition-colors"
    >
      <slot name="icon" />
      <span class="text-textPrimaryColorF font-medium text-sm whitespace-nowrap">
        {{ text }}
      </span>
    </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  link: String,
  text: String
});
</script>

<style lang="scss" scoped>
.item-aside {
  &:hover {
    background-color: #343439;
  }


  svg {
    fill: #343439;
  }

  &:hover {
    svg {
      fill: #8257e5;
    }
  }
}
</style>
