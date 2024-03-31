<template>
  <div
    class="card text-textPrimaryColorF p-[6px] select-none text-sm cursor-pointer w-full bg-subSecondaryColorF h-full min-h-[40px] rounded-lg my-2"
  >
    <nav v-if="props.card.labels.length" class="grid grid-cols-6 gap-1 p-1">
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
    <footer class="grid grid-cols-6 gap-1">
      <DescriptionIcon v-if="stateCardInformation" size="24" />
    </footer>
  </div>
</template>

<script setup>
import { useTextareaAutosize } from "@vueuse/core";
import { useWorkspace } from "~/stores/workspace";
import LabelCard from "./LabelCard.vue";
import DescriptionIcon from "@/components/Common/Icons/DescriptionIcon.vue";

const frames = ref(useWorkspace().frames);

const props = defineProps({
  card: Object,
});

// Control textarea height if title value changes
const { textarea, input, triggerResize } = useTextareaAutosize();

watch(
  frames.value,
  () => {
    triggerResize();
  },
  { deep: true }
);

let stateCardInformation = ref(false);

watch(frames.value, () => hasCardDescription(), { deep: true });

// Show the icon if it has a description
const hasCardDescription = () => {
  if (props.card) {
    const descriptionCharacters = props.card.description.length;

    // The card description typically contains additional HTML characters,
    // which are considered as part of the description length.
    const numberOfStandardHtmlCharacters = 7;

    // If the description length is greater than the default HTML characters,
    // it means the description is not empty.
    const isEmpty = descriptionCharacters > numberOfStandardHtmlCharacters;

    stateCardInformation.value = isEmpty;
  }
};

onMounted(() => {
  hasCardDescription();
});
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
