<template>
  <button
    @click="event"
    class="flex items-center justify-between hover:bg-primaryColorF transition-colors font-medium text-white rounded-md bg-subSecondaryColorF w-full py-2 px-3"
  >
    Editar
    <svg class="w-[16px] h-[16px] fill-white" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd"><g><path d="M11 3.25H4c-.729 0-1.429.29-1.945.805A2.755 2.755 0 0 0 1.25 6v14c0 .729.29 1.429.805 1.945A2.755 2.755 0 0 0 4 22.75h14c.729 0 1.429-.29 1.945-.805A2.755 2.755 0 0 0 20.75 20v-8a.75.75 0 0 0-1.5 0v8A1.252 1.252 0 0 1 18 21.25H4A1.252 1.252 0 0 1 2.75 20V6A1.252 1.252 0 0 1 4 4.75h7a.75.75 0 0 0 0-1.5z" opacity="1" data-original="#000000"></path><path d="M22.237 5.652a1.75 1.75 0 0 0 0-2.475l-1.414-1.414a1.75 1.75 0 0 0-2.475 0L8.095 12.016a.752.752 0 0 0-.215.447l-.353 3.182a.75.75 0 0 0 .828.828l3.182-.353a.752.752 0 0 0 .447-.215L22.237 5.652zm-1.06-1.061L11.11 14.658l-1.989.221.221-1.989L19.409 2.823a.252.252 0 0 1 .354 0l1.414 1.414a.252.252 0 0 1 0 .354z" opacity="1" data-original="#000000" class=""></path><path d="m16.227 4.945 2.828 2.828a.75.75 0 1 0 1.061-1.061l-2.828-2.828a.75.75 0 1 0-1.061 1.061z" opacity="1" data-original="#000000" class=""></path></g></svg>
  </button>
</template>

<script setup>
defineProps({
  event: Function
})
</script>