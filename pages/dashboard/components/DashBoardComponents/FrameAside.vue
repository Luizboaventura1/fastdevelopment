<template>
  <div
    @click="event"
    class="frame flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-colors hover:bg-secondaryColorF"
  >
    <svg class="w-[25px] h-[25px] transition-colors" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><rect width="28" height="28" x="34" y="34" rx="3" opacity="1" data-original="#000000" class=""></rect><rect width="28" height="28" x="2" y="34" rx="3" opacity="1" data-original="#000000" class=""></rect><rect width="28" height="28" x="34" y="2" rx="3" opacity="1" data-original="#000000" class=""></rect><rect width="28" height="28" x="2" y="2" rx="3" opacity="1" data-original="#000000" class=""></rect></g></svg>
    <span
      class="text-white font-medium"
    >
      Quadro
    </span>
  </div>
</template>

<script setup>
defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>
.frame {
  svg {
    fill: #343439;
  }

  &:hover {
    svg {
      fill: #8257e5;
    }

  }
}

</style>
