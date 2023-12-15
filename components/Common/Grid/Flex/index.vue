<template>
  <div :class="flexClass" class="w-full">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  start: { type: Boolean, default: false },
  end: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  between: { type: Boolean, default: false },
  around: { type: Boolean, default: false },
  evenly: { type: Boolean, default: false },
  stretch: { type: Boolean, default: false },
});

const flexClass = {
  flex: true,
  'justify-start': props.start,
  'justify-end': props.end,
  'justify-center': props.center,
  'justify-between': props.between,
  'justify-around': props.around,
  'justify-evenly': props.evenly,
  'justify-stretch': props.stretch,
};
</script>