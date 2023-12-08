<template>
  <div
    @click.stop="$router.push(`/dashboard/${props.frameID}`)"
    class="frame cursor-pointer w-full h-[200px] ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all duration-300 rounded-lg p-4 relative overflow-hidden"
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
            class="bg-subSecondaryColorF w-full max-w-[70%] h-[40px] text-white px-3 py-1 outline-none ring-2 ring-primaryBorder focus:ring-primaryColorF rounded-md"
            type="text"
            placeholder="Nome do quadro"
            v-model="frameName"
          />
        </div>
        <div class="flex gap-4 mt-3 self-start">
          <SaveButton @button="saveChanges"> Salvar </SaveButton>
          <CancelButton @button="toggleSettings"> Cancelar </CancelButton>
        </div>
        <div class="self-end flex justify-end">
          <DeleteButton @button="controlWarningMessage.open('Apagar Quadro?')" size="18" />
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
import CancelButton from "@/components/Buttons/CancelButton.vue";
import SaveButton from "~/components/Buttons/SaveButton.vue";
import DeleteButton from "@/components/Buttons/DeleteButton.vue";
import { useFrame } from "~/stores/frame";
import WarningMessage from "~/components/Common/FeedBack/WarningMessage.vue";

let props = defineProps({
  frameID: String,
});

let stateSettings = ref(false);

const toggleSettings = () => (stateSettings.value = !stateSettings.value);

// Get the current frame
let frame = useFrame().frame[props.frameID];
// Get frame name
let frameName = ref(frame.title);

const saveChanges = () => {
  // Gets the new frame name
  frame.title = frameName.value;

  toggleSettings();
};

const deleteFrame = () => {
  let workspace = useFrame().frame;
  workspace.splice(props.frameID, 1);

  toggleSettings()
};

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
    deleteFrame()
    stateWarningMessage.value = false;
  },
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
