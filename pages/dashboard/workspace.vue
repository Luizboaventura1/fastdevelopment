<template>
  <WorkspaceContainer md>
    <TitleWorkspace lg> Página inicial </TitleWorkspace>
    <WorkspaceContainer ms>
      <Greeting>
        {{ getFirstName(userName) }}
      </Greeting>
    </WorkspaceContainer>
    <FrameBar space-y="6">
      <TitleWorkspace> Quadros </TitleWorkspace>
      <SearchWorkspace />
    </FrameBar>
    <Grid col="2">
      <CreateNewFrameRoot>
        <NewFrameButton @click="handleCreateNewFrame.open">
          <TitleWorkspace> Criar novo quadro </TitleWorkspace>
        </NewFrameButton>
      </CreateNewFrameRoot>
      <FrameRoot
        v-for="(frame, index) in frames"
        :key="index"
        :frameID="String(index)"
      >
        <TitleWorkspace lg> {{ frame.title }} </TitleWorkspace>
      </FrameRoot>
    </Grid>
  </WorkspaceContainer>
  <ModalCreateNewFrame
    @closeModal="handleCreateNewFrame.close"
    :stateModal="stateModalCreateNewFrame"
  >
    <div class="flex justify-between">
      <TitleWorkspace lg> Criar novo quadro </TitleWorkspace>
      <CloseButton size="15" :event="handleCreateNewFrame.close" />
    </div>
    <div>
      <InputModal
        @inputValue="(val) => (inputCreateNewFrame = val)"
        placeholderInput="Nome do quadro"
      />
      <ErrorMessage :message="errorMessageFrame" />
    </div>
    <ConfirmButtonModal :event="createNewFrame">
      Criar Quadro
    </ConfirmButtonModal>
  </ModalCreateNewFrame>
</template>

<script setup>
import TitleWorkspace from "./components/WorkspaceComponents/TitleWorkspace.vue";
import WorkspaceContainer from "./components/WorkspaceComponents/WorkspaceContainer.vue";
import Greeting from "./components/WorkspaceComponents/Greeting.vue";
import FrameBar from "./components/WorkspaceComponents/FrameBar.vue";
import FrameRoot from "./components/WorkspaceComponents/Frame/FrameRoot.vue";
import Grid from "./components/WorkspaceComponents/Grid/Grid.vue";
import CreateNewFrameRoot from "./components/WorkspaceComponents/CreateNewFrame/CreateNewFrameRoot.vue";
import NewFrameButton from "./components/WorkspaceComponents/CreateNewFrame/NewFrameButton.vue";
import { useFrame } from "~/stores/frame";
import SearchWorkspace from "./components/WorkspaceComponents/SearchWorkspace";
import ModalCreateNewFrame from "./components/WorkspaceComponents/CreateNewFrame/ModalCreateNewFrame/ModalCreateNewFrame.vue";
import InputModal from "./components/WorkspaceComponents/CreateNewFrame/ModalCreateNewFrame/InputModal.vue";
import ConfirmButtonModal from "./components/WorkspaceComponents/CreateNewFrame/ModalCreateNewFrame/ConfirmButtonModal.vue";
import CloseButton from "~/components/Common/FeedBack/CloseButton.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import ErrorMessage from "~/components/Common/ErrorComponents/ErrorMessage.vue";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  updateDoc
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

let frames = useFrame().frame;
let userName = ref("");
let userEmail = ref("");
let idUser = ref("");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userEmail.value = user.email;

    // get frame

    const q = query(
      collection(db, "users"),
      where("email", "==", userEmail.value)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // add data to local frame
      if (frames.length === 0) {
        frames.push(...doc.data().workspace);
        addModalStateToCards();
      }

      // get user id from firestore
      idUser.value = doc.id;

      // get name
      userName.value = doc.data().name;
    });
  }
});

const addModalStateToCards = () => {
  frames.forEach((framesArr) => {
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
  frames.push({
    title: inputCreateNewFrame.value,
    frame: [],
  });

  handleCreateNewFrame.close()
  } else {
    errorMessageFrame.value = "Nome do quadro obrigatório!"
  }
};

watch(inputCreateNewFrame, () => {
  // remove an error message
  if (inputCreateNewFrame.value.length != 0) {
    errorMessageFrame.value = ""
  }
})

// Update the list in firebase when changing card position
const updateFrameInFirebase = async () => {
  const frameDocRef = doc(db, "users", idUser.value);

  await updateDoc(frameDocRef, {
    workspace: frames,
  });
};

watch(frames, () => {
  // any changes already updated in firebase
  updateFrameInFirebase();
});

const getFirstName = (val) => {
  return val.split(' ')[0]
}
</script>

<style lang="scss" scoped></style>
