<template>
  <div id="wrapper-toast" class="absolute right-0 top-0 p-3">
    <TransitionGroup name="list" tag="ul" class="p-1 toasts h-full overflow-hidden">
      <li
        v-for="(toastItem, index) in toast.toastList"
        :key="index"
        class="grid grid-cols-[auto,1fr,auto] gap-3 items-center w-[300px] h-[55px] bg-subSecondaryColorF border border-zinc-700 mb-1 shadow rounded text-textPrimaryColorF p-4 overflow-hidden truncate"
        :class="toastStyle"
      >
        <slot name="icon" />

        <span class="truncate">{{ toastItem.title }}</span>

        <slot name="actions" />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  toast: {
    type: Object,
    required: true,
  },
  toastStyle: {
    type: String,
    default: "",
  },
});

const wrapperToast = ref(null);

onMounted(() => {
  wrapperToast.value = document.getElementById("wrapper-toast");
});

watch(
  () => props.toast.toastList,
  () => {
    if (wrapperToast.value) {
      const windowHeight = window.innerHeight;
      const scroll_margin = 50;

      const isHeightExceedingWindow =
        wrapperToast.value.offsetHeight + scroll_margin >= windowHeight;

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
