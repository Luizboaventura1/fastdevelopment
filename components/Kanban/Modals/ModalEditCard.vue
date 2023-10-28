<template>
  <div 
    v-if="stateModal"
    class="modal-edit-card flex flex-col gap-1 w-[200px] h-[100px] p-2 bg-secondaryColorF rounded-md"
  >
    <EditButton
      :event="edit"
    />
    <DeleteButton
      :event="deleteBtn"
    />
  </div>
</template>

<script setup>
import EditButton from '../Buttons/EditButton.vue';
import DeleteButton from '../Buttons/DeleteButton.vue';

defineProps({
  stateModal: Boolean,
  deleteBtn: Function,
  edit: Function
})
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