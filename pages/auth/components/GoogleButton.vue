<template>
  <button
    @click="props.event"
    class="flex items-center justify-center w-full p-3 rounded-md"
  >
    <svg class="fill-white w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M12.479 14.265v-3.279h11.049c.108.571.164 1.247.164 1.979 0 2.46-.672 5.502-2.84 7.669C18.744 22.829 16.051 24 12.483 24 5.869 24 .308 18.613.308 12S5.869 0 12.483 0c3.659 0 6.265 1.436 8.223 3.307L18.392 5.62c-1.404-1.317-3.307-2.341-5.913-2.341-4.829 0-8.606 3.892-8.606 8.721s3.777 8.721 8.606 8.721c3.132 0 4.916-1.258 6.059-2.401.927-.927 1.537-2.251 1.777-4.059l-7.836.004z" opacity="1" data-original="#000000" class=""></path></g></svg>

    <span
      class="text-white ms-3 font-medium"
    >
      Login com Google
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>
button {
  background-color: #2e2e33;
  transition: .3s;
  &:hover {
    background-color: #8257e5;
  }
}
</style>