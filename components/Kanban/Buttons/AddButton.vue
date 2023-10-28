<template>
  <button
    class="rounded-md flex items-center justify-center transition-colors w-[38px] h-[32px]"
    @click="event"
  >
    <svg class="w-[15px] h-[15px] fill-zinc-300" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z" opacity="1" data-original="#000000"></path></g></svg>

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