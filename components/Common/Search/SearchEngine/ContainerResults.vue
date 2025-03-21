<template>
  <ul
    v-if="props.state"
    class="border border-primaryBorderF bg-subSecondaryColorF overflow-hidden shadow-xl rounded-2xl w-full pt-[50px]"
  >
    <slot />
  </ul>
</template>

<script setup>
const props = defineProps({
  state: Boolean,
});
</script>

<style lang="scss" scoped></style>
