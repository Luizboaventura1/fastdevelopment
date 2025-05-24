<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    xml:space="preserve"
    class="fill-darkGrayBorderF w-12 h-12"
    :style="`width: ${props.size}px;height: ${props.size}px;`"
  >
    <g>
      <path
        d="M10.5 4.1v15.8c0 1.5-.638 2.1-2.231 2.1H4.23C2.638 22 2 21.4 2 19.9V4.1C2 2.6 2.638 2 4.231 2H8.27c1.593 0 2.231.6 2.231 2.1zM19.769 2H15.73c-1.593 0-2.231.6-2.231 2.1v8.8c0 1.5.638 2.1 2.231 2.1h4.038C21.362 15 22 14.4 22 12.9V4.1c0-1.5-.638-2.1-2.231-2.1z"
        data-name="1"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: Number,
});
</script>
