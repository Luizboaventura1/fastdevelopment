<template>
  <Transition>
    <div
      v-if="props.isOpen"
      @click.stop="emit('closeModal')"
      class="background fixed z-50 right-0 top-0 w-screen h-screen flex items-center justify-center px-4"
    >
      <div
        @click.stop
        class="w-full flex flex-col gap-5 max-w-md bg-subSecondaryColorF p-4 rounded-lg ring-1 ring-zinc-700"
      >
        <div class="flex justify-between">
          <PrimaryText lg> Criar novo quadro </PrimaryText>
          <CloseButton size="15" :event="() => emit('closeModal')" />
        </div>
        <div>
          <input
            ref="inputElement"
            @keyup.enter="AddNewFrame"
            v-model="input"
            class="w-full border-0 outline-0 text-white rounded-md bg-secondaryColorF p-3 ring-2 ring-transparent focus:ring-primaryColorF"
            type="text"
            placeholder="Nome do quadro"
            autocomplete="off"
          />
          <ErrorMessage :message="errorMessage" />
        </div>
        <PrimaryButton @click="AddNewFrame" medium> Criar Quadro </PrimaryButton>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import PrimaryText from "@/components/Common/Text/PrimaryText/index.vue";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import { useWorkspace } from "~/stores/workspace";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);

const router = useRouter();
const input = ref("");
const inputElement = ref(null);
const errorMessage = ref("");

const AddNewFrame = () => {
  if (validateFrame(input.value)) {
    useWorkspace().frames.unshift({
      title: input.value,
      lists: [],
      labels: [],
    });

    useWorkspace().updateWorkspaceData();
    emit("closeModal");
    input.value = "";

    // Go to the last created frame
    const lastFrameCreatedId = 0;
    router.push(`/dashboard/frame/${lastFrameCreatedId}`);
  } else {
    errorMessage.value = "Nome do quadro obrigatório!";
  }
};

watch(
  () => props.isOpen,
  async () => {
    if (props.isOpen) {
      await nextTick();
      if (inputElement.value) {
        inputElement.value.focus();
      }
    }
  }
);

watch(input, () => {
  if (input.value.length != 0) {
    errorMessage.value = "";
  }
});
</script>

<style lang="scss" scoped>
.background {
  background-color: rgba(0, 0, 0, 0.684);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

::placeholder {
  color: #6b6b71;
}
</style>
