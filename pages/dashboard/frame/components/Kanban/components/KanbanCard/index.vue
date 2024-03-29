<template>
  <div
    class="card text-textPrimaryColorF p-[6px] select-none text-sm cursor-pointer w-full bg-subSecondaryColorF h-full min-h-[40px] rounded-lg my-2"
  >
    <div class="flex items-center min-h-[30px] pointer-events-none">
      <textarea
        ref="textarea"
        rows="1"
        v-model="props.cardDescription"
        @input="triggerResize()"
        @keydown.prevent 
        readonly
        class="w-full card-description px-1 flex items-center bg-transparent resize-none border-none outline-none cursor-pointer"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { useTextareaAutosize } from "@vueuse/core";
import { useWorkspace } from "~/stores/workspace";

const frames = ref(useWorkspace().frames);

const props = defineProps({
  cardDescription: String,
});

const { textarea, input, triggerResize } = useTextareaAutosize();

// Control textarea height if title value changes
watch(
  frames.value,
  () => {
    triggerResize();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.card {
  transition: 0.2s;
  border: 1px solid rgb(54, 54, 54);
  &:hover {
    border: 1px solid rgb(90, 90, 90);
  }
}
</style>
