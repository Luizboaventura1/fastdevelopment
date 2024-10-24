<template>
  <div id="wrapper-toast" class="absolute right-0 top-0 p-3">
    <TransitionGroup
      name="list"
      tag="ul"
      class="p-1 toasts h-full overflow-hidden"
    >
      <li
        v-for="(toast, index) in props.toast.toastList.value"
        :key="index"
        class="grid grid-cols-[auto,1fr,auto] gap-3 items-center w-[300px] h-[55px] bg-subSecondaryColorF border border-zinc-700 mb-1 shadow rounded text-textPrimaryColorF p-4 overflow-hidden truncate"
        :class="props.toastStyle"
      >
        <slot name="icon" />

        <span class="truncate">{{ toast.title }}</span>

        <slot name="actions" />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { ToastInterface } from "./types/ToastInterface";
import { ref, onMounted, watch } from "vue";

const props = defineProps<{ toast: ToastInterface; toastStyle?: string }>();

// Reference for the wrapper-toast element
let wrapperToast = ref<HTMLElement | null>();

// Function executed after the component is mounted
onMounted(() => {
  wrapperToast.value = document.getElementById("wrapper-toast");
});

// Watcher to monitor changes in the toast list
watch(
  () => props.toast.toastList,
  () => {
    if (wrapperToast.value) {
      let windowHeight = window.innerHeight;
      const scroll_margin = 50;

      // Check if the height of the wrapperToast element, considering the scroll margin, exceeds the window height
      const isHeightExceedingWindow =
        wrapperToast.value.offsetHeight + scroll_margin >= windowHeight;

      // Add or remove the 'h-full' class based on the condition
      if (isHeightExceedingWindow) {
        wrapperToast.value.classList.add("h-full");
      } else {
        wrapperToast.value.classList.remove("h-full");
      }
    }
  },
  { deep: true }
);
</script>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
