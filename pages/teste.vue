<template>
  <div
    class="h-screen w-screen bg-subSecondaryColorF flex justify-center items-center"
  >
    <button class="text-white bg-blue-400 p-5" @click="toggle">
      Show toast
    </button>
    <ToastError :state="state" message="Verifique sua conexão" />
  </div>
</template>

<script setup>
import ToastError from "@/components/Common/Toast/Error";

let state = ref(false);
const toggle = () => (state.value = !state.value);
</script>
