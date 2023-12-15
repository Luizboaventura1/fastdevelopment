<template>
  <button
    @click="$emit('button')"
    class="p-2 bg-zinc-700 hover:bg-red-500 rounded-md transition-colors duration-200"
  >
    <svg
      :class="`w-[${props.size}px] h-[${props.size}px]`"
      class="fill-white"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xml:space="preserve"
    >
      <g>
        <path
          d="M23 3h-5v-.5C18 1.121 16.878 0 15.5 0h-7A2.503 2.503 0 0 0 6 2.5V3H1v3h1.62l1.233 14.791A3.52 3.52 0 0 0 7.341 24h9.319a3.52 3.52 0 0 0 3.488-3.209L21.381 6h1.62V3Zm-5.842 17.541a.497.497 0 0 1-.499.459H7.34a.498.498 0 0 1-.499-.459L5.629 6h12.74l-1.212 14.541Zm-9.469-5.352L9.878 13l-2.189-2.189L9.81 8.69l2.189 2.189 2.189-2.189 2.121 2.121L14.12 13l2.189 2.189-2.121 2.121-2.189-2.189L9.81 17.31l-2.121-2.121Z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  </button>
</template>

<script setup>
let props = defineProps({
  size: String,
});
</script>
