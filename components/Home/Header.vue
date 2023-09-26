<template>
  <header class="h-screen w-full p-4 flex justify-center">
    <div class="container h-full">
      <slot />
    </div>
  </header>
</template>

<style lang="scss" scoped>
$primary-color: #8257e5;
$secondary-color: #202024;
$sub-secondary-color: #121214;

header {
  background-color: $secondary-color;
}
</style>