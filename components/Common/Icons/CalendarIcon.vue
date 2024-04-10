<template>
  <svg
    :style="`width: ${size}px;height: ${size}px`"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="512"
    height="512"
    x="0"
    y="0"
    viewBox="0 0 32 32"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class="fill-primary-icon-color"
  >
    <g>
      <path
        d="M24.154 7H23V6a1 1 0 0 0-2 0v1H11V6a1 1 0 0 0-2 0v1H7.846A2.848 2.848 0 0 0 5 9.846V12h22V9.846A2.848 2.848 0 0 0 24.154 7zM5 24.154A2.848 2.848 0 0 0 7.846 27h16.308A2.848 2.848 0 0 0 27 24.154V14H5z"
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
