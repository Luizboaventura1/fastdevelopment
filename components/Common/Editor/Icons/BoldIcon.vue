<template>
  <svg
    :style="`width:${props.size};height:${props.size};`"
    class="fill-textPrimaryColorF focus:fill-blue-600 outline-none"
    tabindex="1"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    xml:space="preserve"
    data-hydrated-width="true"
  >
    <g>
      <path
        d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 0 0 0-5z"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: String,
  color: String,
});
</script>
