<template>
  <button
    @click.stop="$emit('button')"
    class="transition-colors bg-zinc-700 hover:bg-zinc-600 rounded-md p-2"
  >
    <svg
      :class="`w-[${props.size}px] h-[${props.size}px]`"
      class="fill-white"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 128 128"
      xml:space="preserve"
    >
      <g>
        <path
          d="M34 64.4c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm30-10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm40 0c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  </button>
</template>

<script setup>
let props = defineProps({
  event: Function,
  size: String,
});
</script>
