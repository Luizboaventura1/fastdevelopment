<template>
  <WorkspaceContainer md>
    <TitleWorkspace lg> Página inicial </TitleWorkspace>
    <WorkspaceContainer ms>
      <Greeting :name="userName" />
    </WorkspaceContainer>
    <FrameBar space-y="6">
      <TitleWorkspace> Quadros </TitleWorkspace>
    </FrameBar>
    <Grid col="2">
      <CreateNewFrameRoot>
        <NewFrameButton>
          <TitleWorkspace>
            Criar novo quadro
          </TitleWorkspace>
        </NewFrameButton>
      </CreateNewFrameRoot>
      <FrameRoot v-for="(frame, index) in frames" :key="index" :frameID="String(index)">
        <TitleWorkspace xl> {{ frame.title }} </TitleWorkspace>
      </FrameRoot>
    </Grid>
  </WorkspaceContainer>
</template>

<script setup>
import TitleWorkspace from "./components/WorkspaceComponents/TitleWorkspace.vue";
import WorkspaceContainer from "./components/WorkspaceComponents/WorkspaceContainer.vue";
import Greeting from "./components/WorkspaceComponents/Greeting.vue";
import FrameBar from "./components/WorkspaceComponents/FrameBar.vue";
import FrameRoot from "./components/WorkspaceComponents/Frame/FrameRoot.vue";
import Grid from "./components/WorkspaceComponents/Grid/Grid.vue";
import CreateNewFrameRoot from "./components/WorkspaceComponents/CreateNewFrame/CreateNewFrameRoot.vue"
import NewFrameButton from "./components/WorkspaceComponents/CreateNewFrame/NewFrameButton.vue"
import { useFrame } from "~/stores/frame";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

let userInfo = useCookie("userInfo");

let frames = useFrame().frame;
let userName = ref(userInfo.value.name || "");
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
        addModalStateToCards()
      }

      // get user id from firestore
      idUser.value = doc.id;

      // get name
      if (!userInfo.value) {
        userInfo.value = {
          name: doc.data().name,
          email: doc.data().email,
        };

        userName.value = userInfo.value.name;
      }
    });
  }
});

const addModalStateToCards = () => {
  frames.forEach(framesArr => {

    framesArr.frame.forEach(frameArr => {

      frameArr.stateModal = false // add status to list
      frameArr.cards.forEach((card) => {
        card.stateModal = false; // add status to card
      });

    }) 

  })
}
</script>

<style lang="scss" scoped></style>
