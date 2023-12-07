<template>
  <Transition>
    <div
      v-if="props.stateModal"
      @click.stop="$emit('closeModal')"
      class="background fixed z-50 right-0 top-0 w-screen h-screen flex items-center justify-center px-4"
    >
      <div
        @click.stop
        class="w-full flex flex-col gap-5 max-w-md bg-subSecondaryColorF p-4 rounded-lg ring-1 ring-zinc-700"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
let props = defineProps({
  stateModal: Boolean,
});
</script>

<style lang="scss" scoped>
.background {
  background-color: rgba(0, 0, 0, 0.684);
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
