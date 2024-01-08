<template>
  <svg
    :style="`width:${props.size};height:${props.size};`"
    class="fill-textPrimaryColorF focus:fill-blue-600 outline-none"
    tabindex="1"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    data-hydrated-width="true"
  >
    <g>
      <g>
        <path
          d="M20 7H4c-.6 0-1-.4-1-1s.4-1 1-1h16c.6 0 1 .4 1 1s-.4 1-1 1zM16 13H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1zM18 19H6c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1s-.4 1-1 1z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: String,
  color: String,
});
</script>
