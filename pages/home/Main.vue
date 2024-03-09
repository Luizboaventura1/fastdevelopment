<template>
  <main class="flex justify-center items-center px-2">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-7 gap-4 px-0 md:px-10">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: calc(100% - 70px);
}
</style>