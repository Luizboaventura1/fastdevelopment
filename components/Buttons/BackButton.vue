<!--

  Back button to previous page

-->

<template>
  <button
    @click="backButton"
    class="text-slate-50 font-medium px-4 py-2 rounded-md flex items-center"
  >
    <svg class="w-[17px] h-[17px] fill-white me-3" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M22 11H4.414l5.293-5.293a1 1 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L4.414 13H22a1 1 0 0 0 0-2z" opacity="1" data-original="#000000"></path></g></svg>
    <slot />
  </button>
</template>

<script setup>

const backButton = () => history.back()

</script>

<style lang="scss" scoped>
button {
  transition: .3s;
  background-color: #26262a;
  &:hover {
    background-color: #37373c;
  }
}
</style>