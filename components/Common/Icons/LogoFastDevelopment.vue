<template>
  <img
    :class="`w-[${size}px] h-[${size}px]`"
    src="../../../assets/logo-fastdevelopment.png"
    alt="Logo FastDevelopment"
  />
</template>

<script setup>
defineProps({
  size: String,
});
</script>
