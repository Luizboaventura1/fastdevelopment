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
      <FrameRoot
        v-for="(frame, index) in frames"
        :key="index"
        :frameID="String(index)"
      >
        <PrimaryText lg> {{ frame.title }} </PrimaryText>
      </FrameRoot>
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
</template>

<script setup>
import WorkspaceContainer from "./components/WorkspaceComponents/WorkspaceContainer.vue";
import Greeting from "./components/WorkspaceComponents/Greeting.vue";
import FrameBar from "./components/WorkspaceComponents/FrameBar.vue";
import FrameRoot from "./components/WorkspaceComponents/Frame/FrameRoot.vue";
import Grid from "./components/WorkspaceComponents/Grid/Grid.vue";
import CreateNewFrameRoot from "./components/WorkspaceComponents/CreateNewFrame/CreateNewFrameRoot.vue";
import NewFrameButton from "./components/WorkspaceComponents/CreateNewFrame/NewFrameButton.vue";
import SearchWorkspace from "./components/WorkspaceComponents/SearchWorkspace";
import ModalCreateNewFrame from "./components/WorkspaceComponents/CreateNewFrame/ModalCreateNewFrame/ModalCreateNewFrame.vue";
import InputModal from "./components/WorkspaceComponents/CreateNewFrame/ModalCreateNewFrame/InputModal.vue";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import PrimaryButton from "~/components/Common/Buttons/PrimaryButton.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useWorkspace } from "~/stores/workspace";

let workspace = ref([]);
const db = getFirestore();

let frames = ref(useWorkspace().frames);
let userName = ref(useCookie("name").value || "");
let userEmail = ref("");
let idUser = ref("");

onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      workspace.value = data;
      userEmail.value = data.email;
      idUser.value = data.id;

      if (frames.value.length === 0) {
        frames.value.push(...data.frames);
        addModalStateToCards();
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
    frames.value.push({
      title: inputCreateNewFrame.value,
      frame: [],
    });

    handleCreateNewFrame.close();
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

// Update the list in firebase when changing card position
const updateFrameInFirebase = async () => {
  if (idUser.value) {
    const frameDocRef = doc(db, "users", idUser.value);

    await updateDoc(frameDocRef, {
      workspace: frames.value,
    });
  }
};

watchEffect(() => {
  // any changes already updated in firebase
  updateFrameInFirebase();
});

onMounted(async () => {
  let name = useCookie("name").value;

  if (name === undefined) {
    // Add the username to the cookie if it does not exist
    await useWorkspace()
      .workspace()
      .then((data) => {
        useCookie("name").value = data.name;
        userName.value = data.name;
      });
  }
});
</script>

<style lang="scss" scoped></style>
