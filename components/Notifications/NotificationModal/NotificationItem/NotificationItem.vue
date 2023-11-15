<template>
  <div class="notification-item flex items-center mb-2 gap-4 w-full h-[80px] rounded-md p-3">
    <div class="image-content">
      <img
        class="w-[30px] h-[30px]"
        src="@/assets/logo-fastdevelopment.png"
      >
    </div>
    <div class="content">
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
import CloseButton from '~/components/Common/FeedBack/CloseButton.vue';

let props = defineProps({
  title: String,
  message: String
})
</script>

<style lang="scss" scoped>
.notification-item {
  background-color: #3a3a3f;
}
</style>