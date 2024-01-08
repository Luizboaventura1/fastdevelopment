<template>
  <svg
    :style="`width:${props.size};height:${props.size};`"
    class="fill-textPrimaryColorF focus:fill-blue-600 outline-none"
    tabindex="1"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    data-hydrated-width="true"
  >
    <g transform="matrix(-1,0,0,1,48,0)">
      <path
        d="M38 26H18a2 2 0 0 1 0-4h20a2 2 0 0 1 0 4zM38 16H10a2 2 0 0 1 0-4h28a2 2 0 0 1 0 4zM38 36H26a2 2 0 0 1 0-4h12a2 2 0 0 1 0 4z"
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
