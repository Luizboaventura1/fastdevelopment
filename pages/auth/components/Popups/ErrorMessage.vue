<template>
  <div
    v-if="props.popup"
    class="message flex items-center rounded-md bg-secondaryColorF p-2 h-[55px] w-full max-w-xs md:max-w-sm"
  >
    <div class="ms-3">
      <svg class="fill-red-500 h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="m23.341 9.48-3.501-6A5.016 5.016 0 0 0 15.522 1H8.451a5.02 5.02 0 0 0-4.319 2.48l-3.501 6a5.01 5.01 0 0 0 0 5.039l3.501 6a5.016 5.016 0 0 0 4.318 2.48h7.071a5.02 5.02 0 0 0 4.319-2.48l3.5-6a5.01 5.01 0 0 0 0-5.039Zm-7.634 4.812a.999.999 0 1 1-1.414 1.414L12 13.413l-2.293 2.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414l2.293-2.293-2.293-2.293a.999.999 0 1 1 1.414-1.414L12 10.585l2.293-2.293a.999.999 0 1 1 1.414 1.414l-2.293 2.293 2.293 2.293Z" opacity="1" data-original="#000000" class=""></path></g></svg>
    </div>
    <div class="text-red-500 ms-3">
      <span>
        {{ props.message }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  popup: Boolean,
  message: String
})
</script>

<style lang="scss" scoped>
  .message {
    position: absolute;
    right: 25px;
    top: 25px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.528);
  }
</style>