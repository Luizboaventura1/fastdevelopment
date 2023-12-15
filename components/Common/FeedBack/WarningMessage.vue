<template>
  <Transition>
    <div
      v-if="props.state"
      class="background flex items-center justify-center px-4 fixed left-0 top-0 z-40 w-full h-full"
    >
      <div class="modal w-full max-w-lg rounded-lg bg-subSecondaryColorF p-4">
        <div class="icon-container flex justify-center pb-7">
          <svg
            class="w-[45px] h-[45px] fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="512"
            height="512"
            x="0"
            y="0"
            viewBox="0 0 28 28"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g data-name="Layer 2">
                <path
                  d="M26.462 20.246 17.868 3.619a4.2 4.2 0 0 0-7.312.019l-9 16.581A4.2 4.2 0 0 0 5.21 26.5h17.58a4.2 4.2 0 0 0 3.672-6.254zM24.7 23.4a2.184 2.184 0 0 1-1.907 1.1H5.21a2.205 2.205 0 0 1-1.91-3.3l.011-.019 9-16.571a2.206 2.206 0 0 1 3.808-.037L24.705 21.2a2.18 2.18 0 0 1-.005 2.2z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="M14 9a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1z"
                  opacity="1"
                  data-original="#000000"
                  class=""
                ></path>
                <circle
                  cx="14"
                  cy="20"
                  r="1"
                  opacity="1"
                  data-original="#000000"
                  class=""
                ></circle>
              </g>
            </g>
          </svg>
        </div>
        <div class="message text-center text-slate-100 pb-7 px-4">
          {{ props.message }}
        </div>
        <div class="buttons flex flex-col md:flex-row justify-end gap-2">
          <SecondaryButton @click="props.cancel"> Cancelar </SecondaryButton>
          <PrimaryButton @click="props.confirm"> Confirmar </PrimaryButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";
import SecondaryButton from "../Buttons/SecondaryButton.vue";

const props = defineProps({
  message: String,
  state: Boolean,
  cancel: Function,
  confirm: Function,
});
</script>

<style lang="scss" scoped>
.background {
  backdrop-filter: blur(10px);

  .modal {
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.445);
    border: 1px solid #292929fe;
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
