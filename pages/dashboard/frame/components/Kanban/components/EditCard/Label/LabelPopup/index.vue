<template>
  <div
    style="background-color: #0000006e"
    class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-4 z-40"
    @click="emits('closeModal')"
  >
    <div
      @click.stop
      class="bg-subSecondaryColorF w-full max-w-md p-4 rounded-lg ring-1 ring-thirdColorF"
    >
      <header class="grid grid-rows-[auto,auto,1fr] gap-y-3 h-full">
        <nav class="grid grid-cols-[1fr,auto] gap-3">
          <PrimaryText>Etiquetas</PrimaryText>
          <CloseButton size="15" @click="emits('closeModal')" />
        </nav>

        <CreateNewLabel />

        <footer>
          <nav v-if="hasLabels" class="mb-2">
            <SecondaryText sm> Etiquetas </SecondaryText>
          </nav>
          <p v-else class="text-textSecondaryColorF text-sm">
            Nenhuma etiqueta
          </p>
          <div class="max-h-[200px] overflow-y-auto grid grid-cols-1">
            <div
              v-for="(label, index) in cardLabels"
              :key="index"
              class="grid grid-cols-[auto,1fr,auto] items-center gap-3 pe-2 mb-1"
            >
              <Checkbox @click="unmarkLabel(index)" :checked="true" />

              <SingleColor :color="label.color">
                <input
                  class="bg-transparent text-white truncate text-sm w-full outline-none border-none py-2"
                  v-model="label.title"
                  type="text"
                />
              </SingleColor>

              <CloseButton
                @click="modalDeleteLabel.open(label.title, label.color)"
                size="15"
              />
            </div>
            <div v-if="uncheckedLabels.length">
              <div
                v-for="(label, index) in uncheckedLabels"
                :key="index"
                class="grid grid-cols-[auto,1fr,auto] items-center gap-3 pe-2 mb-1"
              >
                <Checkbox @click="markLabel(index)" :checked="false" />

                <SingleColor :color="label.color">
                  <input
                    class="bg-transparent text-white truncate text-sm w-full outline-none border-none py-2"
                    v-model="label.title"
                    type="text"
                  />
                </SingleColor>

                <CloseButton
                  @click="modalDeleteLabel.open(label.title, label.color)"
                  size="15"
                />
              </div>
            </div>
          </div>
        </footer>
      </header>
    </div>
  </div>
  <WarningMessage
    :message="modalDeleteLabel.message"
    :state="modalDeleteLabel.state"
    :cancel="modalDeleteLabel.close"
    :confirm="modalDeleteLabel.confirm"
  />
</template>

<script setup>
import PrimaryText from "@/components/Common/Text/PrimaryText";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import SingleColor from "./SelectColor/SingleColor.vue";
import SecondaryText from "@/components/Common/Text/SecondaryText";
import Checkbox from "./Checkbox.vue";
import { useWorkspace } from "~/stores/workspace";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";
import CreateNewLabel from "./CreateNewLabel/index.vue";

const CURRENT_PAGE_ID = useCookie("currentPageId");
let userId = ref("");
const FRAME_INDEX = useState("frameIndex").value;
const CARD_INDEX = useState("cardIndex").value;
const emits = defineEmits(["closeModal"]);

let frames = ref([]); // All frames
let frame = ref([]); // Current frame
let cardLabels = ref([]);

onMounted(() => {
  useWorkspace()
    .workspace()
    .then((data) => {
      userId.value = data.id;
    });

  frame.value = useWorkspace().frames[CURRENT_PAGE_ID.value];
  frames.value = useWorkspace().frames;
  cardLabels.value =
    frame.value.frame[FRAME_INDEX].cards[CARD_INDEX].labels || [];
});

// Update every change made
watch(
  frame,
  () => {
    useWorkspace().updateWorkspace();
  },
  { deep: true }
);

const modalDeleteLabel = ref({
  state: false,
  label: {},
  message: `Excluir a etiqueta a removerá de todos os cartões e não poderá ser desfeita. Tem certeza?`,
  open: (labelName, color) => {
    modalDeleteLabel.value.state = true;
    modalDeleteLabel.value.label = {
      labelName,
      color,
    };
  },
  close: () => (modalDeleteLabel.value.state = false),
  confirm: () => {
    let labelName = modalDeleteLabel.value.label.labelName;
    let color = modalDeleteLabel.value.label.color;
    deleteLabel(labelName, color);

    modalDeleteLabel.value.state = false;
  },
});

const showUncheckedLabels = (frameLabels, cardLabels) => {
  let uncheckedLabels = [];

  if (frameLabels && cardLabels) {
    uncheckedLabels = frameLabels.filter((frameLabel) => {
      return !cardLabels.filter(
        (cardLabel) =>
          frameLabel.title === cardLabel.title &&
          frameLabel.color === cardLabel.color
      ).length;
    });
  }

  return uncheckedLabels;
};

let uncheckedLabels = ref([]);

onMounted(() => {
  uncheckedLabels.value = showUncheckedLabels(
    frame.value.labels,
    cardLabels.value
  );
});

watchEffect(() => {
  uncheckedLabels.value = showUncheckedLabels(
    frame.value.labels,
    cardLabels.value
  );
});

// Mark Label

const markLabel = (index) => {
  cardLabels.value.push(uncheckedLabels.value[index]);
  useWorkspace().frames[CURRENT_PAGE_ID.value].frame[FRAME_INDEX].cards[
    CARD_INDEX
  ].labels = cardLabels.value;

  useWorkspace().updateWorkspace();
};

const unmarkLabel = (index) => {
  cardLabels.value.splice(index, 1);
  useWorkspace().frames[CURRENT_PAGE_ID.value].frame[FRAME_INDEX].cards[
    CARD_INDEX
  ].labels = cardLabels.value;
  useWorkspace().updateWorkspace();
};

const deleteLabel = (labelName, color) => {
  const condition = (label) =>
    label.title !== labelName && label.color !== color;

  // Delete the local variable
  frame.value.labels = frame.value.labels.filter(condition);
  cardLabels.value = cardLabels.value.filter(condition);

  // Delete all labels
  frame.value.frame.forEach((list) => {
    list.cards.forEach((card) => {
      card.labels = card.labels.filter(
        (label) => label.title !== labelName || label.color !== color
      );
    });
  });

  // Update data
  frames.value[CURRENT_PAGE_ID.value].frame = frame.value.frame;
  frames.value[CURRENT_PAGE_ID.value].labels = frame.value.labels;

  useWorkspace().updateWorkspace();
};

// Check if it has any labels or not

const allLabels = computed(() => [
  ...uncheckedLabels.value,
  ...cardLabels.value,
]);

const hasLabels = ref(allLabels.value.length);

watch(
  allLabels,
  () => {
    hasLabels.value = allLabels.value.length;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
