<template>
  <div
    class="p-1 rounded-full flex justify-center"
    :style="`background-color:${props.color};`"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string; title: string }>();
</script>
