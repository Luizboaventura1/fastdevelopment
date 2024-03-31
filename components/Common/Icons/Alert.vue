<template>
  <svg
    :style="`width: ${size}px;height: ${size}px`"
    class="fill-primary-icon-color"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 28 28"
    xml:space="preserve"
  >
    <g>
      <g data-name="Layer 2">
        <path
          d="M26.462 20.246 17.868 3.619a4.2 4.2 0 0 0-7.312.019l-9 16.581A4.2 4.2 0 0 0 5.21 26.5h17.58a4.2 4.2 0 0 0 3.672-6.254zM24.7 23.4a2.184 2.184 0 0 1-1.907 1.1H5.21a2.205 2.205 0 0 1-1.91-3.3l.011-.019 9-16.571a2.206 2.206 0 0 1 3.808-.037L24.705 21.2a2.18 2.18 0 0 1-.005 2.2z"
          opacity="1"
          data-original="#000000"
        ></path>
        <path
          d="M14 9a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1z"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
        <circle
          cx="14"
          cy="20"
          r="1"
          opacity="1"
          data-original="#000000"
          class=""
        ></circle>
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: String,
});
</script>
