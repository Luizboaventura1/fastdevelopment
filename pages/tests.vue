<template>
  <div class="relative ms-auto text-right w-full">
    <button @click="show = !show">Open notification</button>
    <div class="absolute top-7 right-2">
      <Transition>
        <NotificationModalRoot
          :stateModal="show"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import NotificationModalRoot from '~/components/Notifications/NotificationModal/NotificationModalRoot.vue';

let show = ref(false)
</script>

<style lang="scss" scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>