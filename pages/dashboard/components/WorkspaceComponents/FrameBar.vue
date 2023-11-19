<template>
  <div
    :class="`my-${props.spaceY} mx-${props.spaceX}`"
    class="flex justify-between rounded-full bg-secondaryColorF px-4 py-3 ring-1 ring-zinc-700"
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
