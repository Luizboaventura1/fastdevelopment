<template>
  <div
    v-if="props.stateModal"
    class="background flex items-center justify-center px-4 py-3 fixed left-0 top-0 z-40 w-full h-full"
  >
    <div
      class="modal relative w-full h-full max-w-2xl rounded-md bg-secondaryColorF overflow-y-auto"
    >
      <div class="w-full px-1">
        <nav class="flex w-full h-[70px] px-3">
          <div class="title w-10/12 flex items-center">
            <svg
              class="fill-slate-50 w-[28px] h-[28px]"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="512"
              height="512"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M19 0H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V5a5.006 5.006 0 0 0-5-5zm3 19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3zM18 9a1 1 0 0 1-2 0 1 1 0 0 0-1-1h-2v8h1a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2h1V8H9a1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3h6a3 3 0 0 1 3 3z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <input
              class="bg-secondaryColorF ms-3 text-lg font-medium w-full text-slate-50 px-3 py-2 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
              type="text"
              v-model="title"
            />
          </div>
          <div class="button w-2/12 flex items-center justify-end">
            <CloseButton size="16" :event="props.closeModalBtn" />
          </div>
        </nav>
        <main class="description px-3">
          <div class="flex items-center py-4">
            <svg
              class="fill-slate-50 w-[30px] h-[30px]"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="512"
              height="512"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <h1 class="font-medium text-slate-50 ps-3">Descrição</h1>
          </div>
          <textarea
            v-model="description"
            cols="12"
            rows="12"
            placeholder="Sua descrição..."
            class="w-full outline-none resize-none bg-secondaryColorF p-2 rounded-lg text-white"
          />
        </main>
        <div class="buttons h-[40px] bg-secondaryColorF flex gap-3 px-3 my-3">
          <PrimaryButton full @click="saveChanges"> Salvar </PrimaryButton>
          <SecondaryButton @click="$emit('closeModal')">
            Cancelar
          </SecondaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import SecondaryButton from "~/components/Common/Buttons/SecondaryButton.vue";
import { useWorkspace } from "~/stores/workspace";
import { doc, updateDoc, getFirestore } from "firebase/firestore";

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
});
</script>

<style lang="scss" scoped>
.background {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.676);

  .modal {
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.445);

    textarea {
      height: calc(100dvh - 230px);
    }
  }
}
</style>
