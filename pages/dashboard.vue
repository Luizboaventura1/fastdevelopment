<template>
  <div class="dashboard">
    <nav class="h-[60px] bg-secondaryColorF flex items-center gap-3 px-4">
      <div class="w-2/12 flex items-center">
        <BurguerButton :event="dashboardToggle" />
      </div>

      <div class="w-full flex justify-center items-center gap-3">
        <NewFrameButton @click="handleCreateNewFrame.open">
          <PrimaryText sm> Criar </PrimaryText>
        </NewFrameButton>
        <SearchEngine :array="frames" />
      </div>

      <div class="flex items-center justify-end gap-3 w-2/12">
        <NotificationModal />
        <Account size="30" />
      </div>
    </nav>
    <div class="w-full h-full flex">
      <aside
        class="bg-secondaryColorF overflow-hidden overflow-y-auto"
        :style="`width:${dashboardWidth}px;`"
      >
        <div class="p-4 grid gap-y-1">
          <ItemAside link="/dashboard/workspace" text="Página inicial">
            <template #icon>
              <HomeIcon size="20" />
            </template>
          </ItemAside>

          <DividerDefault />

          <DropdownProjets title="Seus quadros">
            <template #icon>
              <ControlPanelIcon size="20" />
            </template>
            <DropdownItem
              v-for="(frame, index) in frames"
              :key="index"
              :link="`/dashboard/frame/${index}`"
            >
              {{ frame.title }}
            </DropdownItem>
          </DropdownProjets>

          <ItemAside
            @click="() => openWarningMessage('Sair da conta?')"
            text="Sair"
          >
            <template #icon>
              <LogoutIcon size="20" />
            </template>
          </ItemAside>
        </div>
      </aside>
      <div class="flex-1 w-[calc(100% - 280px)] overflow-x-auto h-full">
        <header class="h-full">
          <main
            class="bg-subSecondaryColorF overflow-x-auto p-3 h-full relative"
          >
            <NuxtPage />
          </main>
        </header>
      </div>
    </div>
  </div>

  <Loading :visibility="loading" />
  <WarningMessage
    :state="stateWarningMessage"
    :message="warningMessage"
    :cancel="cancelWarningMessage"
    :confirm="confirmWarningMessage"
  />
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
import LogoutIcon from "@/components/Common/Icons/LogoutIcon.vue";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "#vue-router";
import BurguerButton from "./dashboard/components/BurguerButton.vue";
import Loading from "~/components/Common/Loadings/Loading.vue";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import DividerDefault from "~/components/Common/Dividers/DividerDefault.vue";
import Account from "@/components/Common/Notifications/Popups/Account";
import NotificationModal from "~/components/Common/Notifications/Popups/NotificationModal";
import ItemAside from "./dashboard/components/ItemAside.vue";
import HomeIcon from "~/components/Common/Icons/HomeIcon.vue";
import DropdownProjets from "@/components/Common/Dropdown/DropdownProjects";
import DropdownItem from "@/components/Common/Dropdown/DropdownProjects/DropdownItem.vue";
import ControlPanelIcon from "~/components/Common/Icons/ControlPanelIcon.vue";
import { useWorkspace } from "@/stores/workspace";
import SearchEngine from "@/components/Common/Search/SearchEngine";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { storeToRefs } from "pinia";
import NewFrameButton from "./dashboard/components/CreateNewFrame/NewFrameButton.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText"
import ModalCreateNewFrame from "./dashboard/components/CreateNewFrame/ModalCreateNewFrame/ModalCreateNewFrame.vue";
import InputModal from "./dashboard/components/CreateNewFrame/ModalCreateNewFrame/InputModal.vue";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import ErrorMessage from "@/components/Common/ErrorComponents/ErrorMessage.vue";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";

const auth = getAuth();
const router = useRouter();
let { frames } = storeToRefs(useWorkspace());

// starts true to check if the user is logged in
let loading = ref(true);

definePageMeta({
  middleware: "auth",
});

const logout = async () => {
  loading.value = true;

  await signOut(auth).then(() => {
    loading.value = false;

    // blocks the routes
    const logged = useCookie("token");
    logged.value = false;

    deleteAllCookies();
    frames.value = []; // Reset
    router.push("/");
  });
};

const totalWidthDashboard = "260";
let dashboardWidth = ref(totalWidthDashboard);

const dashboardToggle = () => {
  if (dashboardWidth.value === totalWidthDashboard)
    return (dashboardWidth.value = "0");

  return (dashboardWidth.value = totalWidthDashboard);
};

onMounted(() => {
  const logged = useCookie("token");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      logged.value = true;
      loading.value = false;
    } else {
      logged.value = false;
      router.push("/");
    }
  });
});

// confirm exit account

let stateWarningMessage = ref(false);
let warningMessage = ref("");

const openWarningMessage = (message) => {
  stateWarningMessage.value = true;
  warningMessage.value = message;
};

const cancelWarningMessage = () => (stateWarningMessage.value = false);

const confirmWarningMessage = () => {
  logout();
  cancelWarningMessage();
};

useHead({
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Tenha um rápido desenvolvimento e ganho de produtividade com nossa ferramenta completa de desenvolvimento ágil.",
    },
    { name: "keywords", content: "Kanban,desenvolvimento ágil,jira,trello" },
    { name: "author", content: "Luiz" },
  ],
});

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
      lists: [],
      labels: [],
    });

    useWorkspace().updateWorkspace();

    handleCreateNewFrame.close();

    // Go to the last created frame
    const lastFrameCreatedId = 0; 
    router.push(`/dashboard/frame/${lastFrameCreatedId}`);
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

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid #393939;
}

aside {
  transition: 0.5s;
  border-right: 1px solid #393939;
}

.dashboard {
  height: calc(100vh - 60px);
}
</style>
