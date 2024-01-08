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
      <path
        d="M10 4h2v16h-2v-7H2v7H0V4h2v7h8zm11.797 6.857A3.99 3.99 0 0 0 23 8c0-2.206-1.794-4-4-4h-5v2h5c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c1.654 0 3 1.346 3 3s-1.346 3-3 3h-5v2h5c2.757 0 5-2.243 5-5a5 5 0 0 0-2.203-4.143z"
        opacity="1"
        data-original="#000000"
        class=""
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
