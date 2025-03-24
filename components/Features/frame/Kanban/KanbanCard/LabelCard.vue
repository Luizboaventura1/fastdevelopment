<template>
  <div
    class="py-[5px] rounded flex"
    :class="props.title ? 'px-2' : 'px-5'"
    :style="`background-color:${props.color};`"
  >
    <span class="text-xs truncate">{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string; title: string }>();
</script>
