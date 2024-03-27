<template>
  <svg
  :class="`w-[${size}px] h-[${size}px] fill-zinc-500`"
  xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M22.552 13.21 20.8 6.916A9.443 9.443 0 0 0 2.486 7.4l-1.354 6.089A5.5 5.5 0 0 0 6.5 20.182h.4a5.285 5.285 0 0 0 10.154 0h.193a5.5 5.5 0 0 0 5.3-6.972Zm-3.309 2.984a2.48 2.48 0 0 1-1.991.988H6.5a2.5 2.5 0 0 1-2.44-3.042l1.354-6.1a6.443 6.443 0 0 1 12.5-.326l1.748 6.294a2.478 2.478 0 0 1-.419 2.186Z" opacity="1" data-original="#000000"></path></g></svg>
</template>

<script setup>

defineProps({
  size: String,
})

</script>