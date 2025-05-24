<template>
  <header class="h-full relative w-full bg-subSecondaryColorF p-4 flex justify-center">
    <div class="container h-full">
      <slot />
    </div>
    <div class="circle absolute left-[450px] top-20"></div>
    <div class="circle absolute right-[700px] top-56"></div>
  </header>
</template>

<style scoped>
.circle {
  width: 150px;
  height: 150px;
  background-color: #6c33f065;
  border-radius: 50%;
  filter: blur(60px);
}

@media screen and (max-width: 480px) {
  .circle {
    background-color: rgba(132, 0, 255, 0.458);
  }
}
</style>