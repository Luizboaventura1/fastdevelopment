<template>
  <div :class="`${padding}`">
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
  if (props.sm) return "p-4";
  else if (props.md) return "p-6";
  else if (props.lg) return "p-8";
});
</script>

<style lang="scss" scoped></style>
