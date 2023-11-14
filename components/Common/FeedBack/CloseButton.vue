<template>
  <button
    @click.stop="props.event"
    class="transition-colors rounded-md p-2"
  >
    <svg
      :class="`w-[${props.size}px] h-[${props.size}px]`"
      class="fill-gray-300" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M479.8 512a31.988 31.988 0 0 1-22.769-9.432L266.738 312.28a15.184 15.184 0 0 0-21.475 0L54.975 502.568a32.2 32.2 0 0 1-45.543-45.542L199.72 266.737a15.183 15.183 0 0 0 0-21.474L9.432 54.975A32.2 32.2 0 1 1 54.974 9.432L245.263 199.72a15.184 15.184 0 0 0 21.476 0L457.026 9.432a32.2 32.2 0 0 1 45.543 45.543L312.28 245.263a15.185 15.185 0 0 0 0 21.474l190.289 190.288A32.2 32.2 0 0 1 479.8 512z" opacity="1" data-original="#000000" class=""></path></g></svg>
  </button>
</template>
  
<script setup>
  let props = defineProps({
    event: Function,
    size: String
  })
</script>

<style scoped lang="scss">
button {
  &:hover {
    background-color: #3b3b3f;
  }
}
</style>
  