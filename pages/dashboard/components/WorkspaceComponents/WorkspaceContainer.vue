<template>
  <div :class="`p-${padding}`">
    <slot />
  </div>
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
});

const padding = computed(() => {
  if (props.sm) return "4";
  else if (props.md) return "6";
  else if (props.lg) return "8";
});
</script>

<style lang="scss" scoped></style>
