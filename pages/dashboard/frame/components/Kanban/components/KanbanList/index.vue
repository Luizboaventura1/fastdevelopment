<template>
  <div class="lista grid grid-rows-[auto,1fr,auto] max-h-full w-full relative me-3 bg-secondaryColorF p-3 rounded-lg">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
 .lista {
    border: 1px solid #393939;
    transition: 0.3s;
    &:hover {
      border: 1px solid #575757;
    }
  }
</style>