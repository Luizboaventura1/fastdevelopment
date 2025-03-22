<script setup>
import { vOnClickOutside } from "@vueuse/components";
import CloseButton from "@/components/common/FeedBack/CloseButton.vue";
import { useTextareaAutosize } from "@vueuse/core";
import { ref, nextTick } from "vue";

const props = defineProps({
  buttonName: String,
  event: Function,
  space: {
    type: Boolean,
    default: false,
  },
});

const inputValue = ref("");
const textareaElement = ref(null);
const isButtonVisible = ref(true);
const isCardModalVisible = ref(false);

const openCardModal = async () => {
  if (isButtonVisible.value) {
    await handleModal.open();
  } else {
    handleModal.close();
  }
};

const closeModal = () => handleModal.close();

const handleModal = {
  close: () => {
    isCardModalVisible.value = false;
    isButtonVisible.value = true;
  },
  open: async () => {
    isButtonVisible.value = false;
    isCardModalVisible.value = true;

    await nextTick();
    if (textareaElement.value) {
      textareaElement.value.focus();
    }
  },
};

const { textarea, input, triggerResize } = useTextareaAutosize();
</script>

<template>
  <div class="container-add-new-card rounded-lg">
    <button
      @click="openCardModal"
      :class="{ 'flex': isButtonVisible, 'hidden': !isButtonVisible }"
      class="add-new-card items-center select-none text-zinc-300 text-sm hover:bg-zinc-800 w-full rounded-lg px-4 py-2"
    >
      <svg
        class="w-[15px] h-[15px] me-3 fill-zinc-300"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="512"
        height="512"
        x="0"
        y="0"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <path
            d="M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
      {{ props.buttonName }}
    </button>
    <div
      v-on-click-outside="closeModal"
      :class="{ 'flex-1': isCardModalVisible, 'hidden': !isCardModalVisible, 'p-3': props.space, 'p-0': !props.space }"
      class="modal-add-new-card w-full pt-3"
    >
      <textarea
        ref="textareaElement"
        v-model="inputValue"
        @input="$emit('inputValue', inputValue)"
        @input:resize="triggerResize()"
        @keydown.enter.prevent="props.event"
        placeholder="Descrição..."
        class="resize-none bg-subSecondaryColorF placeholder-zinc-400 w-full text-white text-sm px-3 py-2 outline-none rounded-lg border border-primaryBorderF focus:border-primaryColorF"
      />
      <div class="button-container flex items-center gap-2 mt-2">
        <button
          @click="props.event"
          class="select-none text-sm px-4 py-2 w-full rounded-lg text-white bg-subSecondaryColorF transition-colors hover:bg-primaryColorF font-medium"
        >
          Adicionar
        </button>
        <div class="flex items-center">
          <CloseButton size="15" :event="openCardModal" />
        </div>
      </div>
    </div>
  </div>
</template>