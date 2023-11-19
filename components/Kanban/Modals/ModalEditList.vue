<template>
  <div>
    <OptionsModalRoot :stateModal="props.stateModal">
      <template #nav>
        <TitleOptionsModal> Ações lista </TitleOptionsModal>
        <CloseButton :event="props.event" size="16" />
      </template>

      <template #buttons>
        <ActionOptionsModal :event="() => openWarningMessage('Apagar lista?')">
          Excluir
        </ActionOptionsModal>
      </template>
    </OptionsModalRoot>

    <WarningMessage
      :state="stateWarningMessage"
      :message="warningMessage"
      :cancel="cancelWarningMessage"
      :confirm="confirmWarningMessage"
    />
  </div>
</template>

<script setup>
import { useFrame } from "~/stores/frame";
import WarningMessage from "./WarningMessage.vue";
import OptionsModalRoot from "@/components/Common/Popups/OptionsModal/OptionsModalRoot.vue";
import ActionOptionsModal from "@/components/Common/Popups/OptionsModal/ActionOptionsModal.vue";
import TitleOptionsModal from "@/components/Common/Popups/OptionsModal/TitleOptionsModal.vue";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";

const currentPageId = useCookie("currentPageId")

const dbFrame = useFrame().frame[currentPageId.value].frame;

const props = defineProps({
  stateModal: Boolean,
  event: Function,
  listId: Number,
});

const deleteList = () => {
  dbFrame.splice(props.listId, 1);
};

// warning message when deleting the list

let stateWarningMessage = ref(false);
let warningMessage = ref("");

const openWarningMessage = (message) => {
  stateWarningMessage.value = true;
  warningMessage.value = message;
};

const cancelWarningMessage = () => (stateWarningMessage.value = false);

// Delete list
const confirmWarningMessage = () => {
  deleteList();
  stateWarningMessage.value = false;
};
</script>

<style lang="scss" scoped>
.modal-edit-card {
  position: absolute;
  top: 45px;
  right: -10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.609);
  z-index: 10;
  border: 1px solid rgba(55, 55, 55, 0.998);
}
</style>
