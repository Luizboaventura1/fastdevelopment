<template>
  <div
    :class="`my-${props.spaceY} mx-${props.spaceX}`"
    class="flex items-center justify-between gap-4 rounded-full bg-secondaryColorF px-4 h-[50px] ring-1 ring-zinc-700"
  >
    <slot />
  </div>
</template>

<script setup>
let props = defineProps({
  spaceY: String,
  spaceX: String,
});
</script>
