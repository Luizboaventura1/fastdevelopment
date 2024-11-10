<template>
  <div>
    <OptionsModal :stateModal="props.stateModal">
      <template #nav>
        <TitleOptionsModal> Ações lista </TitleOptionsModal>
        <CloseButton :event="props.event" size="16" />
      </template>

      <template #buttons>
        <ActionOptionsModal :event="() => openWarningMessage('Apagar lista?')">
          Excluir
        </ActionOptionsModal>
      </template>
    </OptionsModal>

    <WarningMessage
      :state="stateWarningMessage"
      :message="warningMessage"
      :cancel="cancelWarningMessage"
      :confirm="confirmWarningMessage"
    />
  </div>
</template>

<script setup>
import { useWorkspace } from "@/stores/workspace.js";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import OptionsModal from "@/components/Common/Notifications/Popups/OptionsModal";
import ActionOptionsModal from "@/components/Common/Notifications/Popups/OptionsModal/components/ActionOptionsModal.vue";
import TitleOptionsModal from "@/components/Common/Notifications/Popups/OptionsModal/components/TitleOptionsModal.vue";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";

const currentPageId = useCookie("currentPageId");

const props = defineProps({
  stateModal: Boolean,
  event: Function,
  listId: Number,
});

let stateWarningMessage = ref(false);
let warningMessage = ref("");

const deleteList = () => {
  useWorkspace().frames[currentPageId.value].lists.splice(props.listId, 1);
  useWorkspace().updateWorkspace();
};

const openWarningMessage = (message) => {
  stateWarningMessage.value = true;
  warningMessage.value = message;
};

const cancelWarningMessage = () => {
  stateWarningMessage.value = false;
};

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
