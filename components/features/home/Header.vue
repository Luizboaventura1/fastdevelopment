<template>
  <header class="h-full lg:h-[90vh] relative w-full bg-subSecondaryColorF p-4 flex justify-center">
    <div class="container h-full">
      <slot />
    </div>
    <div class="circle absolute top-10 -left-16"></div>
    <div class="circle absolute bottom-10 -right-32"></div>
  </header>
</template>

<style scoped>
.circle {
  width: 200px;
  height: 200px;
  background-color: rgba(132, 0, 255, 0.83);
  border-radius: 50%;
  filter: blur(120px);
}

@media screen and (max-width: 480px) {
  .circle {
    background-color: rgba(132, 0, 255, 0.458);
  }
}
</style>