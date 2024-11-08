<template>
  <button
    class="rounded-md flex items-center justify-center transition-colors w-[38px] h-[32px]"
    @click.stop="event"
  >
    <svg class="fill-white w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M34 64.4c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm30-10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm40 0c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" opacity="1" data-original="#000000" class=""></path></g></svg>
  </button>
</template>

<script setup>
defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>
  button {
    &:hover {
      background-color: rgb(51, 54, 56);
    }
  }
</style>