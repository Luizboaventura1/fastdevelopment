<template>
  <button
    :style="`width:${props.size ? props.size : 0}px;height:${props.size ? props.size : 0}px;`"
    class="hover:bg-secondaryColorF rounded flex justify-center items-center"
    data-hydrated-width="true"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  size: String
})
</script>