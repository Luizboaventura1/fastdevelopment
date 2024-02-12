<template>
  <h1 :class="`${font}`" class="font-medium text-textPrimaryColorF">
    <slot />
  </h1>
</template>

<script setup>
let props = defineProps({
  sm: {
    type: Boolean,
    default: false,
  },
  md: {
    type: Boolean,
    default: false,
  },
  lg: {
    type: Boolean,
    default: false,
  },
  xl: {
    type: Boolean,
    default: false,
  },
});

const font = computed(() => {
  if (props.sm) return "text-sm";
  else if (props.md) return "text-base";
  else if (props.lg) return "text-lg";
  else if (props.xl) return "text-2xl";
});
</script>

<style lang="scss" scoped></style>