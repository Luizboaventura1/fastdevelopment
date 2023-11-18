<template>
  <div
    class="notification-item flex items-center bg-subSecondaryColorF my-1 gap-3 w-full h-[80px] rounded-md p-3"
  >
    <div class="image-content">
      <LogoFastDevelopment size="30" />
    </div>
    <div class="content overflow-hidden">
      <div class="notification-title truncate text-white">
        {{ props.title }}
      </div>
      <div class="notification-message truncate text-zinc-200 text-sm">
        {{ props.message }}
      </div>
    </div>
    <div class="actions ms-auto">
      <CloseButton size="15" />
    </div>
  </div>
</template>

<script setup>
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import LogoFastDevelopment from "~/components/Common/Icons/LogoFastDevelopment.vue";

let props = defineProps({
  title: String,
  message: String,
});
</script>

<style scoped lang="scss">
.notification-title,
.notification-message {
  width: 100%;
  max-width: 190px;
}

@media screen and (max-width: 400px) {
  .notification-title,
  .notification-message {
    width: 100%;
    max-width: 140px;
  }
}
</style>
