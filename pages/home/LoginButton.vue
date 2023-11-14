<template>
  <button
    @click="props.event"
    class="flex items-center text-white text-sm font-bold rounded-md me-0 md:me-3 px-4 py-2"
  >
    <svg class="me-3" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512.016 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M192 213.34c-58.816 0-106.668-47.848-106.668-106.664C85.332 47.859 133.184.008 192 .008s106.668 47.851 106.668 106.668c0 58.816-47.852 106.664-106.668 106.664zm0-181.332c-41.172 0-74.668 33.492-74.668 74.668 0 41.172 33.496 74.664 74.668 74.664s74.668-33.492 74.668-74.664c0-41.176-33.496-74.668-74.668-74.668zM368 448.008H16c-8.832 0-16-7.168-16-16V357.34c0-55.871 45.46-101.332 101.332-101.332h181.336c55.871 0 101.332 45.46 101.332 101.332v74.668c0 8.832-7.168 16-16 16zm-336-32h320V357.34c0-38.227-31.105-69.332-69.332-69.332H101.332C63.105 288.008 32 319.113 32 357.34zM496 218.676H314.668c-8.832 0-16-7.168-16-16s7.168-16 16-16H496c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" opacity="1" data-original="#000000"></path><path d="M410.668 304.008a15.89 15.89 0 0 1-11.309-4.692c-6.25-6.253-6.25-16.386 0-22.636l74.028-74.028-74.028-74.027c-6.25-6.25-6.25-16.383 0-22.633s16.383-6.25 22.637 0l85.332 85.332c6.25 6.25 6.25 16.387 0 22.637l-85.332 85.332a15.902 15.902 0 0 1-11.328 4.715zm0 0" data-original="#000000"></path></g></svg>
    <div class="hidden md:flex">
      <slot />
    </div>
  </button>
</template>

<script setup>
let props = defineProps({
  event: Function
})
</script>

<style lang="scss" scoped>
$primary-color: #8257e5;
$secondary-color: #202024;
$sub-secondary-color: #121214;

button {
  transition: .2s;

  svg {
    width: 18px;
    height: 18px;
    fill: $primary-color;
  }
}

@media screen and (max-width: 768px) {
  button {
  transition: .2s;

    svg {
      width: 18px;
      height: 18px;
      fill: white;
    }
  }
}
</style>
