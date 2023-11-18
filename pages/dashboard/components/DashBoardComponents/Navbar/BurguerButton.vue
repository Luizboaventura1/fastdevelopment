<template>
  <div
    @click="event"
    class="cursor-pointer"
  >
    <svg
      class="fill-white transition-colors hover:bg-zinc-700 rounded-full w-[45px] h-[45px] p-2"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512" x="0" y="0"
      viewBox="0 0 20 20"
      style="enable-background:new 0 0 512 512"
      xml:space="preserve"><g transform="matrix(-1,0,0,1,20,0)"><path fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm6 5a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1z" clip-rule="evenodd" opacity="1" data-original="#000000" class=""></path></g></svg>
  </div>
</template>

<script setup>
defineProps({
  event: Function
})
</script>