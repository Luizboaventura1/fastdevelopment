<template>
  <svg
    :style="`width: ${size}px;height: ${size}px`"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class="fill-primary-icon-color"
  >
    <g>
      <rect
        width="43.18"
        height="7.44"
        x="10.41"
        y="9.35"
        rx="2"
        opacity="1"
        data-original="#000000"
        class=""
      ></rect>
      <path
        d="M39.88 7.35a3.048 3.048 0 0 0-3-3.35h-9.5a3.042 3.042 0 0 0-3 3.35zM13.3 18.79l1.36 35.44a5.985 5.985 0 0 0 6 5.77h22.69a5.99 5.99 0 0 0 6-5.76l1.42-35.45z"
        opacity="1"
        data-original="#000000"
        class=""
      ></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: String,
});
</script>