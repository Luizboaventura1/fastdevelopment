<template>
  <div class="flex flex-wrap gap-2">
    <div
      @click="$emit('colorButton')"
      class="rounded h-[35px] py-2 px-3 truncate text-sm cursor-pointer ring-0 ring-white hover:ring-2 text-white"
      v-for="label in props.labels"
      :key="label"
      :style="`background-color: ${label.color};`"
    >
      {{ label.title }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
});
</script>
