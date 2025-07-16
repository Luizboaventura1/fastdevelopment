<template>
  <img
    :class="`w-[${size}px] h-[${size}px]`"
    src="../../../assets/fastdevelopment-logo.svg"
    alt="Logo FastDevelopment"
  />
</template>

<script setup>
defineProps({
  size: String,
});
</script>
