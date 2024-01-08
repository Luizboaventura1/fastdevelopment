<template>
  <div
    v-if="props.stateModal"
    @click="changeWarningMessage.open"
    class="background flex items-start justify-end fixed right-0 bottom-0 z-10 w-full h-[calc(100%-60px)]"
  >
    <div
      @click.stop
      class="modal w-full flex flex-col max-w-3xl h-full bg-subSecondaryColorF"
    >
      <nav class="flex w-full h-[70px] px-3">
        <div class="title w-10/12 flex items-center">
          <input
            class="bg-subSecondaryColorF px-2 text-lg font-bold w-full text-textPrimaryColorF py-2 outline-none rounded-md"
            type="text"
            v-model="title"
          />
        </div>
        <div class="w-2/12 flex items-center justify-end">
          <CloseButton size="16" :event="changeWarningMessage.open" />
        </div>
      </nav>
      <main class="h-[calc(100%-70px)] flex">
        <div class="w-9/12 h-full">
          <main class="description px-3 grid grid-rows-[auto,1fr,auto] h-full">
            <div class="flex items-center h-[60px] py-4">
              <h1 class="font-medium text-textPrimaryColorF text-sm px-2">
                Descrição
              </h1>
            </div>
            <Editor
              placeholder-f="adicionar descrição..."
              @getHtml="(html) => description = html"
              :htmlInput="description"
            />
            <div class="h-[60px] flex items-center gap-3">
              <PrimaryButton full @click="saveChanges" small>
                Salvar
              </PrimaryButton>
              <SecondaryButton @click="changeWarningMessage.open" small>
                Cancelar
              </SecondaryButton>
            </div>
          </main>
        </div>
        <aside class="w-3/12 h-full px-3 flex flex-col gap-y-1">
          <EditCardButton @click="openWarningMessage('Apagar o cartão?')">
            <BinIcon size="20" />
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
  <WarningMessage
    :state="changeWarningMessage.state"
    :cancel="changeWarningMessage.close"
    :message="changeWarningMessage.message"
    :confirm="changeWarningMessage.confirm"
  />
</template>

<script setup>
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import SecondaryButton from "~/components/Common/Buttons/SecondaryButton.vue";
import { useWorkspace } from "~/stores/workspace";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import EditCardButton from "./EditCardButton.vue";
import BinIcon from "@/components/Common/Icons/BinIcon.vue";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";
import Editor from "@/components/Common/Editor";

const currentPageId = useCookie("currentPageId");

const db = getFirestore();

let frames = useWorkspace().frames;
let idUser = ref("");

// Get id in firestore

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      idUser.value = data.id;
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
let description = ref("");
let oldDescription = ref("")

// saves card changes
const saveChanges = async () => {
  await saveValuesToFirebase();

  emit("closeModal");
};

// save the values ​​in firebase
const saveValuesToFirebase = async () => {
  frames[currentPageId.value].frame[props.indexFrame].cards[
    props.indexCard
  ].title = title.value;

  frames[currentPageId.value].frame[props.indexFrame].cards[
    props.indexCard
  ].description = description.value;

  const frameDocRef = doc(db, "users", idUser.value);

  await updateDoc(frameDocRef, {
    workspace: frames,
  });
};

// Update values ​​if they change
watchEffect(() => {
  let currentPage =
    frames[currentPageId.value]?.frame[props.indexFrame]?.cards[
      props.indexCard
    ];

  title.value = currentPage?.title;
  description.value = currentPage?.description;
  oldDescription.value = currentPage?.description;
});

// Warning message

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

// Change popup

const changeWarningMessage = ref({
  message: 'Descartar alterações?',
  state: false,
  open: function () {
    if (description.value != oldDescription.value) {
      changeWarningMessage.value.state = true
    } else {
      emit("closeModal")
    }
  },
  close: function () {
    changeWarningMessage.value.state = false
  },
  confirm: function () {
    emit("closeModal")
    changeWarningMessage.value.state = false
  }
})

</script>

<style lang="scss" scoped>
.background {
  .modal {
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.414);
    border-left: 1px solid #393939;
    transition: 0.4s;
  }
}
</style>
