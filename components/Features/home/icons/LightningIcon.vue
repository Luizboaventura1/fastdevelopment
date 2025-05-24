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
        d="M9.692 24a.999.999 0 0 1-.983-1.181l1.628-8.849H6a1 1 0 0 1-.822-1.571L13.486.429a1 1 0 0 1 1.807.736L13.974 9H18a1 1 0 0 1 .843 1.539l-8.308 13a1 1 0 0 1-.843.461z"
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
