<template>
  <div
    @click.stop="$router.push(`/dashboard/${props.frameID}`)"
    class="frame frame-root cursor-pointer w-full h-[200px] ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all duration-300 rounded-lg p-4 relative overflow-hidden"
  >
    <slot />

    <div class="settings absolute right-4 top-4 z-10">
      <FrameSettingsBtn size="20" @button="toggleSettings" />
    </div>

    <Transition>
      <div
        @click.stop
        v-if="stateSettings"
        class="absolute grid grid-rows-[auto,1fr,auto] w-full h-full bg-secondaryColorF right-0 top-0 p-3"
      >
        <div>
          <input
            class="bg-subSecondaryColorF w-full max-w-[70%] h-[40px] text-white px-3 py-1 outline-none ring-2 ring-primaryBorderF focus:ring-primaryColorF rounded-md"
            type="text"
            placeholder="Nome do quadro"
            v-model="frameName"
          />
          <div>
            <ErrorMessage :message="errorMessageFrame" />
          </div>
        </div>
        <div class="flex gap-4 mt-3 self-start">
          <PrimaryButton @click="saveChanges" small> Salvar </PrimaryButton>
          <SecondaryButton @click="toggleSettings" small>
            Cancelar
          </SecondaryButton>
        </div>
        <div class="self-end flex justify-end">
          <DeleteButton
            @button="controlWarningMessage.open('Apagar Quadro?')"
            size="18"
          />
        </div>
      </div>
    </Transition>
  </div>
  <WarningMessage
    :state="stateWarningMessage"
    :message="warningMessage"
    :confirm="controlWarningMessage.confirmWarningMessage"
    :cancel="controlWarningMessage.close"
  />
</template>

<script setup>
import FrameSettingsBtn from "../Buttons/FrameSettingsBtn.vue";
import SecondaryButton from "~/components/Common/Buttons/SecondaryButton.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import { useWorkspace } from "~/stores/workspace";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import DeleteButton from "~/components/Common/Buttons/DeleteButton.vue";

let props = defineProps({
  frameID: String,
});

let stateSettings = ref(false);
const toggleSettings = () => (stateSettings.value = !stateSettings.value);

// Get the current frame
let frame = useWorkspace().frames[props.frameID];
let frameName = ref(frame?.title || "");

watchEffect(() => {
  frame = useWorkspace().frames[props.frameID];
  frameName.value = frame.title;
});

const saveChanges = () => {
  if (validateFrame(frameName.value)) {
    // Gets the new frame name
    frame.title = frameName.value;

    toggleSettings();
  } else {
    errorMessageFrame.value = "Nome do quadro obrigatório!";
  }
};

const deleteFrame = () => {
  let frames = useWorkspace().frames;
  frames.splice(props.frameID, 1);

  toggleSettings();
};

let errorMessageFrame = ref("");

watch(frameName, () => {
  // remove an error message
  if (frameName.length != 0) {
    errorMessageFrame.value = "";
  }
});

// Warning message

let stateWarningMessage = ref(false);
let warningMessage = ref("");

let controlWarningMessage = {
  open: (msg) => {
    stateWarningMessage.value = true;
    warningMessage.value = msg;
  },
  close: () => (stateWarningMessage.value = false),
  confirmWarningMessage: () => {
    deleteFrame();
    stateWarningMessage.value = false;
  },
};

// Add a click event listener to the main element (e.g. body)
onMounted(() => {
  document.body.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.body.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  // Check if the click occurred outside frame
  const frameElement = document.querySelector(".frame-root");

  if (frameElement && !frameElement.contains(event.target)) {
    // Close frame
    stateSettings.value = false;
  }
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
