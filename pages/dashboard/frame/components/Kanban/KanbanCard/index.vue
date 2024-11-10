<template>
  <div
    class="card text-textPrimaryColorF p-[6px] select-none text-sm cursor-pointer w-full bg-subSecondaryColorF h-full min-h-[40px] rounded-lg my-2"
  >
    <nav v-if="props.card.labels.length" class="flex flex-wrap gap-1 p-1">
      <LabelCard
        v-for="label in props.card.labels"
        :key="label"
        :color="`${label.color}`"
        :title="label.title"
      />
    </nav>
    <main class="flex items-center min-h-[30px] pointer-events-none">
      <textarea
        ref="textarea"
        rows="1"
        v-model="props.card.title"
        @input="triggerResize()"
        @keydown.prevent
        readonly
        class="w-full card-description px-1 flex items-center bg-transparent resize-none border-none outline-none cursor-pointer"
      ></textarea>
    </main>
    <footer class="flex">
      <div class="flex">
        <DescriptionIcon v-if="stateCardInformation" size="24" />
        <CalendarIcon v-if="stateDate" size="24" />
      </div>
      <div class="flex justify-end items-center w-full">
        <button
          v-if="
            convertTimestampToDate(props.card?.dateFeatures.date) instanceof
            Date
          "
          :style="isComplete ? colors.checked : ''"
          class="flex justify-between items-center w-[22px] h-[22px] p-1 border border-zinc-500 text-zinc-500 text-sm rounded-full transition-colors duration-200"
        >
          <svg
            style="width: 20px; height: 20px"
            :class="isComplete ? 'fill-white' : 'fill-zinc-500'"
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
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useTextareaAutosize } from "@vueuse/core";
import { useWorkspace } from "~/stores/workspace";
import LabelCard from "./LabelCard.vue";
import DescriptionIcon from "@/components/Common/Icons/DescriptionIcon.vue";
import CalendarIcon from "~/components/Common/Icons/CalendarIcon.vue";
import { storeToRefs } from "pinia";

const props = defineProps({
  card: Object,
});

const { textarea, input, triggerResize } = useTextareaAutosize();
const { frames } = storeToRefs(useWorkspace());

const stateDate = ref(false);
const stateCardInformation = ref(false);
const isComplete = ref(props.card.dateFeatures.complete);

const colors = {
  checked: "color:white;border-color:#15942a;background-color:#15942a;",
  unchecked: "color:#71717a;border-color:#71717a;background-color:none;",
};

const hasCardDescription = () => {
  if (props.card) {
    const descriptionCharacters = props.card.description.length;
    const numberOfStandardHtmlCharacters = 7;
    stateCardInformation.value = descriptionCharacters > numberOfStandardHtmlCharacters;
  }
};

const controlDateModalState = () => {
  const timestamp = props.card?.dateFeatures?.date;
  const convertedDate = convertTimestampToDate(timestamp);
  stateDate.value = convertedDate instanceof Date;
};

onMounted(() => {
  hasCardDescription();
  controlDateModalState();
});

watch(
  frames.value,
  () => {
    triggerResize();
    controlDateModalState();
    hasCardDescription();
    isComplete.value = props.card?.dateFeatures.complete;
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
