<template>
  <h1 :class="`text-${font}`" class="font-medium text-textSecondaryColorF">
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
  if (props.sm) return "sm";
  else if (props.md) return "base";
  else if (props.lg) return "lg";
  else if (props.xl) return "2xl";
});
</script>

<style lang="scss" scoped></style>