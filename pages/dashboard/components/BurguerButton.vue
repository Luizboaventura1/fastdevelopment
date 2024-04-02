<template>
  <div @click="event" class="cursor-pointer transition-colors hover:bg-zinc-700 rounded-full">
    <svg
      class="fill-white w-[33px] h-[33px] p-2"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 469.333 469.333"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <path
          d="M21.333 128H448c11.782 0 21.333-9.551 21.333-21.333S459.782 85.333 448 85.333H21.333C9.551 85.333 0 94.885 0 106.667S9.551 128 21.333 128zM448 213.333H21.333C9.551 213.333 0 222.885 0 234.667S9.551 256 21.333 256H448c11.782 0 21.333-9.551 21.333-21.333s-9.551-21.334-21.333-21.334zM448 341.333H21.333C9.551 341.333 0 350.885 0 362.667S9.551 384 21.333 384H448c11.782 0 21.333-9.551 21.333-21.333s-9.551-21.334-21.333-21.334z"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  event: Function,
});
</script>
