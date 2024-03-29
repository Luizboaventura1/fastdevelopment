<template>
  <main class="w-100 grid grid-cols-1 gap-y-3">
    <input
      class="w-full h-[45px] text-sm outline-none px-4 border-transparent border-2 hover:border-primaryColorF focus:border-primaryColorF rounded-lg bg-secondaryColorF text-textPrimaryColorF"
      type="text"
      placeholder="Criar etiqueta"
      v-model="labelName"
      maxlength="50"
    />
    <ErrorMessage :message="inputErrorMessage" />
    <div class="relative">
      <button
        @click="colorSelectModal = !colorSelectModal"
        class="flex items-center justify-between text-textPrimaryColorF bg-secondaryColorF hover:bg-secondaryColorFHover transition-colors p-3 w-full font-medium rounded-lg text-sm"
      >
        Selecionar cor
        <svg
          class="fill-white w-[15px] h-[15px]"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 492.004 492.004"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g
            transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,492.00401306152344,-0.00004577636721592171)"
          >
            <path
              d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
              opacity="1"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </button>
      <ErrorMessage :message="colorErrorMessage" />
      <SelectColor v-if="colorSelectModal" class="absolute">
        <div class="grid grid-cols-5 gap-3">
          <SingleColor
            v-for="color in ALL_COLORS"
            :key="color"
            @click="SELECTED_COLOR_BUTTON(color)"
            :color="color"
          />
        </div>
      </SelectColor>
      <div class="grid grid-cols-3 gap-3 mt-3">
        <PrimaryButton @click="addLabel" small>Adicionar</PrimaryButton>
        <SingleColor
          class="col-span-2 cursor-default"
          v-if="selectedColor"
          :color="selectedColor"
        >
          <PrimaryText class="truncate" sm>{{ labelName }}</PrimaryText>
        </SingleColor>
      </div>
    </div>
  </main>
</template>

<script setup>
import ErrorMessage from "@/components/Common/ErrorComponents/ErrorMessage.vue";
import SelectColor from "../SelectColor/index.vue";
import SingleColor from "../SelectColor/SingleColor.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText/index.vue";
import { useWorkspace } from "~/stores/workspace";

const CURRENT_PAGE_ID = useCookie("currentPageId");
let userId = ref("");
let frames = ref([]); // All frames
let frame = ref([]); // Current frame

onMounted(() => {
  useWorkspace()
    .workspace()
    .then((data) => {
      userId.value = data.id;
    });

  frame.value = useWorkspace().frames[CURRENT_PAGE_ID.value];
  frames.value = useWorkspace().frames;
});

let labelName = ref("");
let colorSelectModal = ref(false);
let selectedColor = ref("");

const SELECTED_COLOR_BUTTON = (color) => {
  selectedColor.value = color;
  colorSelectModal.value = false;
  colorErrorMessage.value = "";
};

// Add new Label

let colorErrorMessage = ref("");

const addLabel = () => {
  if (selectedColor.value && labelName.value.length <= 50) {
    if (!doesThisLabelExist()) {
      const NEW_LABEL = {
        color: selectedColor.value,
        title: labelName.value,
        checked: false,
      };

      frame.value.labels.push(NEW_LABEL);
      useWorkspace().updateWorkspace();
    } else {
      colorErrorMessage.value = "Essa etiqueta já existe!";
    }
  } else {
    colorErrorMessage.value = "Selecione uma cor!";
  }
};

let inputErrorMessage = ref("");
const INPUT_ERROR_MESSAGES = {
  maxlength: "Máximo de 50 caracteres!",
};

// Show error message if label exceeds 50 characters
watch(labelName, () => {
  if (labelName.value.length >= 50) {
    inputErrorMessage.value = INPUT_ERROR_MESSAGES.maxlength;
  } else {
    inputErrorMessage.value = ""; // to false
  }
});

const ALL_COLORS = [
  "#872a36",
  "#2a6087",
  "#87822a",
  "#36872a",
  "#652a87",
  "#7f2a87",
  "#2a877e",
  "#87592a",
];

const doesThisLabelExist = () => {
  if (frame.value.labels) {
    return !!frame.value.labels.filter((label) => {
      return (
        label.color === selectedColor.value
      );
    }).length;
  }

  return false
};
</script>

<style lang="scss" scoped></style>
