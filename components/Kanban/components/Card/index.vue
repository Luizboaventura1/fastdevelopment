<template>
  <div
    class="card resize-none text-white px-3 text-sm flex items-center cursor-pointer w-full bg-subSecondaryColorF h-[40px] p-1 rounded-lg my-2"
  >
    <p class="w-full truncate px-1">
      <slot />
    </p>
  </div>
</template>

<style scoped lang="scss">
.card {
  transition: .2s;
  border: 1px solid rgb(54, 54, 54);
  &:hover {
    border: 1px solid rgb(90, 90, 90);
  }
}
</style>