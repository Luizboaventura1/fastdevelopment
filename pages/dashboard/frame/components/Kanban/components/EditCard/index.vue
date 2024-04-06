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

const currentPageId = useCookie("currentPageId");

let frames = useWorkspace().frames;
let userId = ref("");

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

// function to close the card edit modal
const emit = defineEmits(["closeModal"]);

// Card title and description
let title = ref("");
let titleErrorMessage = ref("");
let description = ref("");

// Update values ​​if they change
watchEffect(() => {
  let currentPage =
    frames[currentPageId.value]?.frame[props.indexFrame]?.cards[
      props.indexCard
    ];

  title.value = currentPage?.title;
  description.value = currentPage?.description;
});


const updateCardDetails = async () => {
  if (frames[currentPageId.value]?.frame[props.indexFrame]?.cards) {
    titleErrorMessage.value = ""; // Remove error message

    if (title.value) {
      frames[currentPageId.value].frame[props.indexFrame].cards[
        props.indexCard
      ].title = title.value;

      frames[currentPageId.value].frame[props.indexFrame].cards[
        props.indexCard
      ].description = description.value;

      useWorkspace().updateWorkspace();
    } else {
      titleErrorMessage.value = "Mínimo de 1 caracter!";
    }
  }
};

watch(title, updateCardDetails);
watch(description, updateCardDetails);

let stateWarningMessage = ref(false);
let warningMessage = ref("");

const openWarningMessage = (msg) => {
  warningMessage.value = msg;
  stateWarningMessage.value = true;
};

const confirmWarningMessage = () => {
  frames[currentPageId.value].frame[props.indexFrame].cards.splice(
    props.indexCard,
    1
  );
  stateWarningMessage.value = false;
  emit("closeModal");
};

// Editor
let stateEditor = ref(false);
const closeEditor = () => (stateEditor.value = false);

// Label popup
let stateLabelPopup = ref(false);

// Receive card labels
let labels = ref(
  frames[currentPageId.value]?.frame[props.indexFrame]?.cards[props.indexCard]
    ?.labels || []
);

// Update card labels
watchEffect(() => {
  labels.value =
    frames[currentPageId.value]?.frame[props.indexFrame]?.cards[props.indexCard]
      ?.labels || [];
});

const { textarea, input, triggerResize } = useTextareaAutosize();
</script>

<style lang="scss" scoped>
.background {
  .modal {
    border-left: 1px solid #393939;
    transition: 0.4s;
  }
}
</style>
