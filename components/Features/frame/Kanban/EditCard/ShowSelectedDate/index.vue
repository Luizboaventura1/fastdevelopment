<template>
  <div v-if="formatDeliveryDate !== undefined" class="pb-3">
    <h1 class="text-zinc-400 text-sm pb-3">Data</h1>
    <div class="flex justify-start items-center gap-3">
      <div
        class="flex flex-wrap items-center gap-3 bg-subSecondaryColorF text-textPrimaryColorF text-sm p-2 rounded-md border border-thirdBorderF hover:border-zinc-500 transition-colors cursor-pointer"
      >
        <span>Entrega em: {{ formatDeliveryDate }}</span>
        <CompleteDateButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import CompleteDateButton from "./CompleteDateButton.vue";
import { useWorkspace } from "~/stores/workspace";
import { storeToRefs } from "pinia";

const currentPageId = Number(useRoute().params.id);
const frameIndex = useState("frameIndex");
const cardIndex = useState("cardIndex");

const { frames } = storeToRefs(useWorkspace());

const formatDeliveryDate = computed(() => {
  if (
    frames.value[currentPageId]?.lists[frameIndex.value]?.cards[cardIndex.value]?.dateFeatures?.date
  ) {
    return formatDate(
      convertTimestampToDate(
        frames.value[currentPageId].lists[frameIndex.value].cards[
          cardIndex.value
        ].dateFeatures.date
      )
    );
  }
  return undefined;
});

const formatDate = (date) => {
  if (date) {
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const daysOfWeek = [
      "domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const currentDay = date.getDate();
    const currentMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();

    return `${currentDay} de ${currentMonth}, ${currentYear} ${dayOfWeek}`;
  }
  return null;
};

onMounted(async () => {
  await useWorkspace()
    .fetchWorkspaceData()
    .then((data) => {
      if (!frames.value.length) {
        frames.value = data.frames;
      }
    });
});
</script>

<style scoped></style>