<template>
  <div
    class="px-2 py-[5px] rounded flex"
    :style="`background-color:${props.color};`"
  >
    <span class="text-xs truncate">{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string; title: string }>();
</script>
