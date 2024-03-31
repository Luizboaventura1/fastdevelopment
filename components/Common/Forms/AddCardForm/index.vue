<template>
  <div class="container-add-new-card rounded-lg">
    <button
      @click="openCardModal"
      :class="`${cardVisibility}`"
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
      :class="`${cardModalVisibility} ${props.space ? 'p-3' : 'p-0'}`"
      class="modal-add-new-card w-full pt-3"
    >
      <textarea
        v-model="inputValue"
        @input="$emit('inputValue', inputValue)"
        @input:resize="triggerResize()"
        @keydown.enter.prevent
        placeholder="Descrição..."
        class="resize-none bg-secondaryColorF placeholder-zinc-400 w-full text-white text-sm px-3 py-2 outline-none ring-transparent focus:ring-primaryColorF ring-1 ring-thirdColorF rounded-md"
      />
      <div class="button-container flex items-center gap-2 mt-2">
        <button
          @click="props.event"
          class="select-none text-sm px-4 py-2 w-full rounded-lg text-white bg-subSecondaryColorF ring-1 ring-thirdColorF transition-colors hover:bg-primaryColorF font-medium"
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

<script setup>
import { vOnClickOutside } from "@vueuse/components";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import { useTextareaAutosize } from "@vueuse/core";

let props = defineProps({
  buttonName: String,
  event: Function,
  space: [Boolean, false],
});

let inputValue = ref();

// show modal to add new card

let cardVisibility = ref("flex");
let cardModalVisibility = ref("hidden");

const openCardModal = () => {
  if (cardVisibility.value === "flex") return handleModal.open();
  else return handleModal.close();
};

const closeModal = () => handleModal.close();

const handleModal = {
  close: () => {
    cardModalVisibility.value = "hidden";
    cardVisibility.value = "flex";
  },
  open: () => {
    cardVisibility.value = "hidden";
    cardModalVisibility.value = "flex-1";
  },
};

const { textarea, input, triggerResize } = useTextareaAutosize();
</script>
