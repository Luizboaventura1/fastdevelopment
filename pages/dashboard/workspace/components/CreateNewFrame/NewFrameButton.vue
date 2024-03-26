<template>
  <div class="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer transition-colors rounded-lg">
    <div class="w-[50px] h-[50px] flex items-center justify-center border-dotted border-2 border-zinc-600 rounded-lg">
      <svg class="w-[20px] h-[20px] fill-zinc-200" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 93.562 93.562" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="m87.952 41.17-36.386.11V5.61A5.598 5.598 0 0 0 45.956 0a5.598 5.598 0 0 0-5.61 5.61l.11 35.561H5.61A5.598 5.598 0 0 0 0 46.781a5.597 5.597 0 0 0 5.61 5.609h34.791v35.562a5.599 5.599 0 0 0 5.61 5.61 5.599 5.599 0 0 0 5.61-5.61V52.391h36.331a5.599 5.599 0 0 0 5.61-5.61 5.616 5.616 0 0 0-5.61-5.611z" opacity="1" data-original="#000000" class=""></path></g></svg>
    </div>
    <slot />
  </div>
</template>