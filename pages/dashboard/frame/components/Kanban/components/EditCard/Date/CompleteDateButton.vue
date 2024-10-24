<template>
  <button
    @click.stop="completeDateButton"
    :style="completeDate ? colors.checked : ''"
    class="flex justify-between items-center w-[22px] h-[22px] p-1 border border-zinc-500 text-zinc-500 text-sm rounded-full transition-colors duration-200"
  >
    <svg
      style="width: 20px; height: 20px"
      :class="completeDate ? 'fill-white' : 'fill-zinc-500'"
      class="rounded-full cursor-pointer transition-colors duration-200"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xml:space="preserve"
    >
      <g>
        <path
          d="M25.56 7.36 13 20.4l-6.59-6.56a2 2 0 0 0-2.82 2.82l8 8a2 2 0 0 0 1.43.59 2 2 0 0 0 1.42-.61l14-14.5a2 2 0 0 0-.05-2.83 2 2 0 0 0-2.83.05z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useWorkspace } from "~/stores/workspace";
import type Frame from "~/stores/types/frame";
import { storeToRefs } from "pinia";

const currentPageId = Number(useRoute().params.id);
const frameIndex = useState<number>("frameIndex");
const cardIndex = useState<number>("cardIndex");
const { frames }: { frames: Ref<Frame[]> } = storeToRefs(useWorkspace());

const completeDate = computed(() => {
  return frames.value[currentPageId]?.lists[frameIndex.value]?.cards[
    cardIndex.value
  ]?.dateFeatures?.complete;
});

const completeDateButton = () => {
  if (isValidCardReference()) {
    frames.value[currentPageId].lists[frameIndex.value].cards[
      cardIndex.value
    ].dateFeatures.complete = !completeDate.value;

    useWorkspace().updateWorkspace();
  }
};

const isValidCardReference = () => {
  return !!frames.value?.[currentPageId]?.lists?.[frameIndex.value]?.cards?.[
    cardIndex.value
  ];
};

const colors = {
  checked: "color:white;border-color:#15942a;background-color:#15942a;",
  unchecked: "color:#71717a;border-color:#71717a;background-color:none;",
};
</script>

<style lang="scss" scoped></style>
