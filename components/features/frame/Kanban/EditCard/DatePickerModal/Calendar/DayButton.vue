<template>
  <button
  :style="`width: ${props.size}px;height: ${props.size}px;`"
    class="flex justify-center items-center text-textPrimaryColorF text-sm font-medium rounded-full p-1 transition-colors duration-300"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ size: string }>();
</script>
