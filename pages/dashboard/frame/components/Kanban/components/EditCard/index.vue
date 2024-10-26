<template>
  <div
    v-if="props.stateModal"
    @click="emit('closeModal')"
    class="background flex items-start justify-end fixed right-0 bottom-0 z-10 w-full h-[calc(100%-60px)]"
  >
    <div
      @click.stop
      class="modal w-full flex flex-col max-w-3xl h-full bg-secondaryColorF"
    >
      <main class="h-full flex py-2">
        <div class="w-9/12 h-full overflow-y-auto px-3 pb-1 py-2">
          <nav class="mb-3">
            <textarea
              ref="textarea"
              v-model="title"
              @input="triggerResize"
              @keydown.enter.prevent
              class="bg-secondaryColorF resize-none hover:outline-thirdBorderF outline-2 outline-transparent focus:outline-thirdBorderF px-2 text-lg font-bold w-full text-textPrimaryColorF py-2 outline-none rounded-md"
            />
            <ErrorMessage :message="titleErrorMessage" />
          </nav>
          <header class="px-2">
            <div v-if="labels.length" class="pb-3">
              <h1 class="text-zinc-400 text-sm pb-3">Etiquetas</h1>
              <LabelsInUse
                @colorButton="stateLabelPopup = true"
                :labels="labels"
              />
            </div>
            <ShowSelectedDate @click="stateDatePopup = true" />
            <div class="pb-3">
              <h1 class="text-zinc-400 text-sm pb-3">Descrição</h1>
            </div>
          </header>
          <Editor
            v-on-click-outside="closeEditor"
            v-show="stateEditor"
            placeholder-f="adicionar descrição..."
            @getHtml="(html) => (description = html)"
            :htmlInput="description"
            class="min-h-[300px]"
          />
          <CardDescription
            class="min-h-[300px] ring-1 ring-transparent rounded-lg cursor-pointer hover:ring-primaryBorderF"
            @click="stateEditor = true"
            v-show="!stateEditor"
            :content="description"
            placeholder-f="Adicionar uma descrição ao cartão..."
          />
        </div>
        <aside class="w-3/12 h-full px-3 flex flex-col gap-y-2">
          <nav class="flex justify-end mb-3">
            <CloseButton size="16" @click="emit('closeModal')" />
          </nav>
          <EditCardButton @click="stateLabelPopup = true">
            <TagIcon size="18" />
            Etiqueta
          </EditCardButton>
          <EditCardButton @click="stateDatePopup = true">
            <CalendarIcon size="18" />
            Data
          </EditCardButton>
          <EditCardButton @click="openWarningMessage('Apagar o cartão?')">
            <BinIcon size="18" />
            Excluir
          </EditCardButton>
        </aside>
      </main>
    </div>
  </div>
  <WarningMessage
    :state="stateWarningMessage"
    :cancel="() => (stateWarningMessage = false)"
    :message="warningMessage"
    :confirm="confirmWarningMessage"
  />
  <LabelPopup v-if="stateLabelPopup" @closeModal="stateLabelPopup = false" />
  <DateSelector v-if="stateDatePopup" @closeModal="stateDatePopup = false" />
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import { useWorkspace } from "~/stores/workspace";
import EditCardButton from "./EditCardButton.vue";
import BinIcon from "@/components/Common/Icons/BinIcon.vue";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";
import Editor from "@/components/Common/Editor";
import CardDescription from "./CardDescription/index.vue";
import TagIcon from "~/components/Common/Icons/TagIcon.vue";
import LabelPopup from "./Label/LabelPopup/index.vue";
import LabelsInUse from "./Label/LabelsInUse.vue";
import { useTextareaAutosize } from "@vueuse/core";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import { storeToRefs } from "pinia";
import DateSelector from "./Date/DateSelector"
import ShowSelectedDate from "./Date/ShowSelectedDate.vue";
import CalendarIcon from "~/components/Common/Icons/CalendarIcon.vue";

const currentPageId = useCookie("currentPageId");
const { textarea, input, triggerResize } = useTextareaAutosize();
let { frames } = storeToRefs(useWorkspace());
let userId = ref("");
let title = ref("");
let titleErrorMessage = ref("");
let description = ref("");
let labels = ref([]);
let stateEditor = ref(false);
let stateWarningMessage = ref(false);
let stateLabelPopup = ref(false);
let warningMessage = ref("");
let stateDatePopup = ref(false)

// Get id in firestore

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      userId.value = data.id;
    });
});

const props = defineProps({
  stateModal: Boolean,
  indexCard: Number,
  indexFrame: Number,
  closeModalBtn: Function,
});

const updateCardDetails = async () => {
  if (frames.value[currentPageId.value]?.lists[props.indexFrame]?.cards) {
    titleErrorMessage.value = ""; // Remove error message

    if (title.value) {
      frames.value[currentPageId.value].lists[props.indexFrame].cards[
        props.indexCard
      ].title = title.value;

      frames.value[currentPageId.value].lists[props.indexFrame].cards[
        props.indexCard
      ].description = description.value;

      useWorkspace().updateWorkspace();
    } else {
      titleErrorMessage.value = "Mínimo de 1 caracter!";
    }
  }
};

const openWarningMessage = (msg) => {
  warningMessage.value = msg;
  stateWarningMessage.value = true;
};

const confirmWarningMessage = () => {
  frames.value[currentPageId.value].lists[props.indexFrame].cards.splice(
    props.indexCard,
    1
  );
  stateWarningMessage.value = false;
  emit("closeModal");
};

const closeEditor = () => (stateEditor.value = false);

const emit = defineEmits(["closeModal"]);

watchEffect(() => {
  // Update card labels
  if (frames.value) {
    labels.value =
      frames.value[currentPageId.value]?.lists[props.indexFrame]?.cards[
        props.indexCard
      ]?.labels || [];
  }

  // Get title and description
  if (frames.value[currentPageId.value]?.lists) {
    let card =
      frames.value[currentPageId.value]?.lists[props.indexFrame]?.cards[
        props.indexCard
      ];

    title.value = card?.title;
    description.value = card?.description;
  }
});

watch(title, updateCardDetails);
watch(description, updateCardDetails);
</script>

<style lang="scss" scoped>
.background {
  .modal {
    border-left: 1px solid #393939;
    transition: 0.4s;
  }
}
</style>
