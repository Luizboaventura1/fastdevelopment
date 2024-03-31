<template>
  <svg
    class="fill-primary-icon-color"
    :style="`width: ${size}px;height: ${size}px`"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    xml:space="preserve"
  >
    <g>
      <path
        d="M4.5 7a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1zm0 4a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1zm0 4a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1zm0 4a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1z"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: String,
});
</script>
