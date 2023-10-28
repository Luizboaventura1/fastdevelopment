<template>
  <div class="container-add-new-card">
    <button
      @click="openCardModal" 
      :class="`${cardVisibility}`"
      class="add-new-card items-center text-zinc-300 text-sm bg-subSecondaryColorF w-full rounded-lg px-4 py-3"
    >
      <svg class="w-[15px] h-[15px] me-3 fill-zinc-300" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z" opacity="1" data-original="#000000"></path></g></svg>
      Adicionar nova lista
    </button>
    <div 
      :class="`${cardModalVisibility}`"
      class="modal-add-new-card w-full bg-subSecondaryColorF p-3 rounded-lg"
    >
      <textarea
        v-model="newCardInput"
        placeholder="Nova lista"
        class="resize-none bg-secondaryColorF w-full text-white px-3 py-2 outline-none ring-2 ring-transparent focus:ring-primaryColorF rounded-md"
      />
      <div class="button-container flex gap-2 mt-2">
        <button
          @click="addNewCard(props.typeList)"
          class="add-new-card-btn px-4 py-2 w-full rounded-lg text-white bg-secondaryColorF transition-colors hover:bg-primaryColorF font-medium"
        >
          Adicionar
        </button>
        <CloseButton
          :event="openCardModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseButton from '../Buttons/CloseButton.vue';
import { useFrame } from '~/stores/frame';

const dbFrame = useFrame()

let props = defineProps({
  indexCard: Number,
  indexFrame: Number,
})


// Add new card

// show modal to add new card
let cardVisibility = ref('flex')
let cardModalVisibility = ref('hidden')

const openCardModal = () => {
  if (cardVisibility.value === 'flex') {
    cardVisibility.value = 'hidden'
    cardModalVisibility.value = 'flex-1'
  } else {
    cardVisibility.value = 'flex'
    cardModalVisibility.value = 'hidden'
  }
}

// Add new card

let newCardInput = ref('')

const addNewCard = () => {
  if (validateCard(newCardInput.value)) {
    dbFrame.frame.push(        {
      title: newCardInput.value,
      cards: [] 
    },)

    clearInput()
  }
}

// Validate Card

const validateCard = (description) => {
  description.trim()
  if (description.length === 0)
    return false

  return true
}

const clearInput = () => {
  newCardInput.value = ''
}
</script>

<style lang="scss" scoped>
.add-new-card {
  transition: .3s;
  &:hover {
    background-color: #000000;
  }
}
</style>