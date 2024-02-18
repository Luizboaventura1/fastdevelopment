<template>
  <h1 :class="`${font ? font : 'font-lg'}`" class="font-bold text-textPrimaryColorF">
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
  xxl: {
    type: Boolean,
    default: false,
  },
});

const font = computed(() => {
  if (props.sm) return "text-lg";
  else if (props.md) return "text-2xl";
  else if (props.lg) return "text-3xl";
  else if (props.xl) return "text-4xl";
  else if (props.xxl) return "text-5xl";
});
</script>

<style lang="scss" scoped></style>