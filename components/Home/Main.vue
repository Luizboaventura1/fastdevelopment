<template>
  <main class="flex justify-center items-center">

    <div>
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: calc(100% - 70px);
}
</style>