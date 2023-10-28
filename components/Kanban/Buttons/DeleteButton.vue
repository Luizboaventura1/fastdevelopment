<template>
  <button
    @click.stop="event"
    class="flex items-center justify-between hover:bg-red-700 transition-colors font-medium text-white rounded-md bg-subSecondaryColorF w-full py-2 px-3"
  >
    Excluir
    <svg class="w-[16px] h-[16px] fill-white" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M23 3h-5v-.5A2.5 2.5 0 0 0 15.5 0h-7A2.5 2.5 0 0 0 6 2.5V3H1v3h2v15a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6h2Zm-5 18H6V6h12Z" opacity="1" data-original="#000000"></path><path d="M8 9h3v9H8zM13 9h3v9h-3z" opacity="1" data-original="#000000"></path></g></svg>
  </button>
</template>

<script setup>
defineProps({
  event: Function
})
</script>