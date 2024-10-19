<template>
  <div
    @mouseleave="closeAllModals"
    @click.stop="openFrame"
    class="frame frame-root cursor-pointer w-full h-[200px] ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all duration-300 rounded-lg p-4 relative overflow-hidden"
  >
    <slot />

    <div class="settings absolute right-4 top-4 z-10">
      <FrameSettingsBtn size="20" @button="toggleSettings" />
      <OptionsModal class="mr-2" :stateModal="stateSettings">
        <template #nav>
          <TitleOptionsModal> Editar quadro </TitleOptionsModal>
          <CloseButton :event="toggleSettings" size="15" />
        </template>
        <template #buttons>
          <ActionOptionsModal :event="toggleEditFrameName">
            Mudar nome do quadro
          </ActionOptionsModal>
          <ActionOptionsModal
            @click="warningModalController.openModal('Apagar Quadro?')"
          >
            Excluir quadro
          </ActionOptionsModal>
        </template>
      </OptionsModal>
    </div>

    <Transition>
      <div
        @click.stop
        v-if="stateEditFrameName"
        class="absolute grid grid-rows-[auto,1fr,auto] w-full h-full bg-secondaryColorF right-0 top-0 p-3"
      >
        <div>
          <input  
            @keyup.enter="saveNameFrame"
            class="input-frame-name bg-subSecondaryColorF w-full max-w-[70%] h-[40px] text-white px-3 py-1 outline-none ring-2 ring-primaryBorderF focus:ring-primaryColorF rounded-md"
            type="text"
            placeholder="Nome do quadro"
            v-model="frameName"
          />
          <div>
            <ErrorMessage :message="errorMessageFrame" />
          </div>
        </div>
        <div class="flex gap-4 mt-3 self-start">
          <PrimaryButton @click="saveNameFrame" small> Salvar </PrimaryButton>
          <SecondaryButton @click="toggleEditFrameName" small>
            Cancelar
          </SecondaryButton>
        </div>
      </div>
    </Transition>
  </div>
  <WarningMessage
    :state="isWarningModalOpen"
    :message="warningModalMessage"
    :confirm="warningModalController.handleConfirm"
    :cancel="warningModalController.closeModal"
  />
</template>

<script setup>
import FrameSettingsBtn from "../Buttons/FrameSettingsBtn.vue";
import SecondaryButton from "~/components/Common/Buttons/SecondaryButton.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import OptionsModal from "@/components/Common/Notifications/Popups/OptionsModal";
import TitleOptionsModal from "~/components/Common/Notifications/Popups/OptionsModal/components/TitleOptionsModal.vue";
import ActionOptionsModal from "~/components/Common/Notifications/Popups/OptionsModal/components/ActionOptionsModal.vue";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import { useRouter } from "#vue-router";
import { useWorkspace } from "~/stores/workspace";

const router = useRouter();

let props = defineProps({
  frameID: String,
});

let stateSettings = ref(false);
const toggleSettings = () => (stateSettings.value = !stateSettings.value);

const openFrame = () => {
  router.push(`/dashboard/frame/${props.frameID}`);
};

let frame = useWorkspace().frames[props.frameID];
let frameName = ref(frame?.title || "");

watch(
  useWorkspace().frames,
  () => {
    frame = useWorkspace().frames[props.frameID];
    frameName.value = frame?.title;
  },
  { deep: true }
);

const saveNameFrame = () => {
  if (validateFrame(frameName.value)) {
    useWorkspace().frames[props.frameID].title = frameName.value;
    useWorkspace().updateWorkspace();

    toggleEditFrameName();
  } else {
    errorMessageFrame.value = "Nome do quadro obrigatório!";
  }
};

const deleteFrame = () => {
  let frames = useWorkspace().frames;
  frames.splice(props.frameID, 1);

  useWorkspace().updateWorkspace();
  toggleSettings();
};

let errorMessageFrame = ref("");

watch(frameName, () => {
  if (frameName.length) {
    errorMessageFrame.value = ""; // remove the error message
  }
});

let isWarningModalOpen = ref(false);
let warningModalMessage = ref("");

let warningModalController = {
  openModal: (msg) => {
    isWarningModalOpen.value = true;
    warningModalMessage.value = msg;

    stateSettings.value = false;
  },
  closeModal: () => (isWarningModalOpen.value = false),
  handleConfirm: () => {
    deleteFrame();
    isWarningModalOpen.value = false;
  },
};

onMounted(() => {
  document.body.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.body.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  const frameElement = document.querySelector(".frame-root");

  if (frameElement && !frameElement.contains(event.target)) {
    // Close frame settings
    stateSettings.value = false;
  }
};

let stateEditFrameName = ref(false);

const toggleEditFrameName = () => {
  stateEditFrameName.value = !stateEditFrameName.value;
  stateSettings.value = false;

  if (stateEditFrameName.value) {
    nextTick(() => {
      const inputElement = document.querySelector('.input-frame-name');
      if (inputElement) {
        inputElement.focus();
      }
    });
  }
};

const closeAllModals = () => {
  stateSettings.value = false;
  stateEditFrameName.value = false;
};

</script>

<style lang="scss" scoped>
.frame {
  background-color: #18181a;

  &:hover {
    .settings {
      opacity: 1;
    }
  }
  .settings {
    opacity: 0;
    transition: 0.3s;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
