<template>
  <button
    :class="[buttonSize, defaultSize, !buttonWidth ? '' : 'w-full']"
    class="text-white rounded bg-primaryColorF transition-colors duration-300 hover:bg-primaryColorFHover"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  medium: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
});

const buttonWidth = computed(() => props.full);
const buttonSize = {
  "font-medium py-2 px-5 text-sm": props.small,
  "font-medium py-2 px-6 text-md": props.medium,
  "font-bold py-3 px-14 text-md": props.large,
};

const defaultSize = computed(() => {
  if (!props.small && !props.medium && !props.large) {
    return "font-medium py-2 px-6 text-md"
  }
})
</script>

<style lang="scss" scoped></style>
