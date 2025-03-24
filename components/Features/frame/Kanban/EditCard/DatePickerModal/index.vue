<template>
  <ModalBackdrop @click="emit('closeModal')">
    <div
      @click.stop
      class="bg-subSecondaryColorF w-full max-w-md p-4 rounded-lg ring-1 ring-thirdColorF"
    >
      <nav class="flex gap-3 justify-between items-center mb-3">
        <PrimaryText> Selecionar data </PrimaryText>
        <CloseButton @click="emit('closeModal')" size="15" />
      </nav>

      <Calendar v-model="date" />
      <footer class="flex justify-between items-center">
        <div>
          <CheckBoxButton
            v-if="currentCard?.dateFeatures.date !== null"
            @click="completeDateButton"
            :checked="completeDate"
            size="24"
          />
        </div>
        <div class="flex items-center gap-3">
          <ClearButton @click="removeDate"> Remover </ClearButton>
          <PrimaryButton @click="selectDate" small> Selecionar </PrimaryButton>
        </div>
      </footer>
    </div>
  </ModalBackdrop>
</template>

<script setup>
import PrimaryText from "@/components/Common/Text/PrimaryText/index.vue";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import ClearButton from "./ClearButton.vue";
import ModalBackdrop from "./ModalBackdrop.vue";
import Calendar from "./Calendar";
import CheckBoxButton from "./CheckBoxButton.vue";
import { useWorkspace } from "~/stores/workspace";
import { storeToRefs } from "pinia";

const { frames } = storeToRefs(useWorkspace());
let date = ref(new Date());
let completeDate = ref(false);
const currentPageId = Number(useRoute().params.id);
const frameIndex = useState("frameIndex").value;
const cardIndex = useState("cardIndex").value;

const selectDate = () => {
  if (isValidCardReference()) {
    const card = frames.value[currentPageId].lists[frameIndex].cards[cardIndex];

    if (!card?.dateFeatures) {
      card.dateFeatures = { complete: false, date: date.value };
    }

    card.dateFeatures.date = convertTimestampToDate(date.value);
    card.dateFeatures.complete = false;

    useWorkspace().updateWorkspaceData();
    emit("closeModal");
  }
};

const completeDateButton = () => {
  if (isValidCardReference()) {
    completeDate.value = !completeDate.value;

    frames.value[currentPageId].lists[frameIndex].cards[
      cardIndex
    ].dateFeatures.complete = completeDate.value;

    useWorkspace().updateWorkspaceData();
  }
};

const removeDate = () => {
  if (isValidCardReference()) {
    frames.value[currentPageId].lists[frameIndex].cards[
      cardIndex
    ].dateFeatures = {
      date: null,
      complete: false,
    };

    useWorkspace().updateWorkspaceData();
    emit("closeModal");
  }
};

const getDataFrames = async () => {
  await useWorkspace()
    .fetchWorkspaceData()
    .then((data) => {
      if (!frames.value.length) {
        useWorkspace().frames = data.frames;
      }
    });
};

const isValidCardReference = () => {
  return !!frames.value?.[currentPageId]?.lists?.[frameIndex]?.cards?.[cardIndex];
};

const currentCard = computed(() => {
  return frames.value[currentPageId].lists[frameIndex].cards[cardIndex];
});

onBeforeMount(async () => {
  await getDataFrames();
});

onBeforeMount(() => {
  if (isValidCardReference()) {
    const card = frames.value[currentPageId].lists[frameIndex].cards[cardIndex];
    completeDate.value = card.dateFeatures.complete;
  }
});

const emit = defineEmits(["closeModal"]);
</script>