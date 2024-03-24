<template>
  <Transition>
    <div
      v-if="stateModal"
      class="modal-edit-card flex flex-col gap-1 w-[200px] bg-secondaryColorF rounded-md"
    >
      <nav class="flex items-center p-2">
        <slot name="nav" />
      </nav>
      <section>
        <slot name="buttons" />
      </section>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  stateModal: Boolean,
})
</script>

<style lang="scss" scoped>
  .modal-edit-card {
    position: absolute;
    top: 45px;
    right: -10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.413);
    z-index: 10;
    border: 1px solid rgba(55, 55, 55, 0.998);
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>