<template>
  <WorkspaceContainer md>
    <PrimaryText md> Página inicial </PrimaryText>

    <WorkspaceContainer ms>
      <Greeting>
        {{ getFirstName(userName) }}
      </Greeting>
    </WorkspaceContainer>

    <FrameBar space-y="6">
      <PrimaryText> Quadros </PrimaryText>
      <SearchWorkspace />
    </FrameBar>

    <Grid col="2">
      <CreateNewFrameRoot>
        <NewFrameButton @click="handleCreateNewFrame.open">
          <PrimaryText> Criar novo quadro </PrimaryText>
        </NewFrameButton>
      </CreateNewFrameRoot>
      <Frame
        v-for="(frame, index) in frames"
        :key="index"
        :frameID="String(index)"
      >
        <PrimaryText lg class="truncate"> {{ frame.title }} </PrimaryText>
      </Frame>
    </Grid>
  </WorkspaceContainer>

  <ModalCreateNewFrame
    @closeModal="handleCreateNewFrame.close"
    :stateModal="stateModalCreateNewFrame"
  >
    <div class="flex justify-between">
      <PrimaryText lg> Criar novo quadro </PrimaryText>
      <CloseButton size="15" :event="handleCreateNewFrame.close" />
    </div>
    <div>
      <InputModal
        @inputValue="(val) => (inputCreateNewFrame = val)"
        placeholderInput="Nome do quadro"
      />
      <ErrorMessage :message="errorMessageFrame" />
    </div>
    <PrimaryButton @click="createNewFrame" medium> Criar Quadro </PrimaryButton>
  </ModalCreateNewFrame>

  <SpeedInsights />
</template>

<script setup>
import WorkspaceContainer from "./components/WorkspaceContainer.vue";
import Greeting from "./components/Greeting.vue";
import FrameBar from "./components/FrameBar.vue";
import Frame from "./components/Frame";
import Grid from "./components/Grid/Grid.vue";
import CreateNewFrameRoot from "./components/CreateNewFrame/CreateNewFrameRoot.vue";
import NewFrameButton from "./components/CreateNewFrame/NewFrameButton.vue";
import SearchWorkspace from "./components/SearchWorkspace";
import ModalCreateNewFrame from "./components/CreateNewFrame/ModalCreateNewFrame/ModalCreateNewFrame.vue";
import InputModal from "./components/CreateNewFrame/ModalCreateNewFrame/InputModal.vue";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import ErrorMessage from "@/components/Common/ErrorComponents/ErrorMessage.vue";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText";
import { useWorkspace } from "@/stores/workspace";
import { useRouter } from "#vue-router";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const router = useRouter();

let frames = ref(useWorkspace().frames);
let userName = ref(useCookie("name").value || "");

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      if (!frames.value.length) {
        frames.value.push(...data.frames);
        addModalStateToCards();
      }

      if (!userName.value) {
        useCookie("name").value = data.name;
        userName.value = data.name;
      }
    });
});

const addModalStateToCards = () => {
  frames.value.forEach((framesArr) => {
    framesArr.frame.forEach((frameArr) => {
      frameArr.stateModal = false; // add status to list
      frameArr.cards.forEach((card) => {
        card.stateModal = false; // add status to card
      });
    });
  });
};

// Modal create new Frame

let stateModalCreateNewFrame = ref(false);
let inputCreateNewFrame = ref("");
let errorMessageFrame = ref("");

const handleCreateNewFrame = {
  open: () => (stateModalCreateNewFrame.value = true),
  close: () => (stateModalCreateNewFrame.value = false),
};

const createNewFrame = () => {
  if (validateFrame(inputCreateNewFrame.value)) {
    useWorkspace().frames.unshift({
      title: inputCreateNewFrame.value,
      frame: [],
      labels: [],
    });

    handleCreateNewFrame.close();

    // Go to the last created frame
    const lastFrameCreatedId = 0
    router.push(`frame/${lastFrameCreatedId}`);
  } else {
    errorMessageFrame.value = "Nome do quadro obrigatório!";
  }
};

watch(inputCreateNewFrame, () => {
  // remove an error message
  if (inputCreateNewFrame.value.length != 0) {
    errorMessageFrame.value = "";
  }
});
</script>

<style lang="scss" scoped></style>
