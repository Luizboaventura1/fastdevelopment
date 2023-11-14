<template>
  <div
    v-if="visibility"
    class="background fixed z-50 left-0 top-0 select-none w-screen h-screen flex items-center justify-center"
  >
    <img
      class="w-[50px] h-[50px]"
      src="../../../assets/logo-fastdevelopment.png"
      alt="Logo FastDevelopment"
    >
  </div>
</template>

<script setup>
defineProps({
  visibility: Boolean
})
</script>

<style lang="scss" scoped>
.background {
  background-color: rgb(0, 0, 0);

  img {
    animation: logo 2s ease-in-out infinite;
    transform: translateY(0px);
  }
}

@keyframes logo {
  0% {
		transform: translateY(0px);
	}
        
	50% {
		transform: translateY(-20px);
	}
        
	100% {
		transform: translateY(0px);
	}
}
</style>