<template>
  <div
    class="card flex items-center cursor-pointer w-full bg-secondaryColorF p-1 rounded-lg min-h-[40px] my-2"
  >
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
  position: relative;

  &:hover {
    background-color: #252529;
    .edit-card-button {
      display: flex !important;
    }
  }
}
</style>
