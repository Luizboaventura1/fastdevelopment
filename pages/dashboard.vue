<template>
  <div class="h-[calc(100vh-60px)]">
    <nav class="h-[60px] bg-secondaryColorF flex items-center gap-3 px-4 border-b border-primaryBorderF">
      <div class="w-2/12 flex items-center">
        <BurguerButton :event="dashboardToggle" />
      </div>

      <div class="w-full flex justify-center items-center gap-3">
        <AddFrameButton @click="handleAddFrameModal.open">
          <PrimaryText sm> Criar </PrimaryText>
        </AddFrameButton>
        <SearchEngine :array="frames" />
      </div>

      <div class="flex items-center justify-end gap-3 w-2/12">
        <NotificationModal />
        <AccountModal size="30" />
      </div>
    </nav>
    <aside class="w-full h-full flex">
      <section
        class="bg-secondaryColorF overflow-hidden overflow-y-auto border-r border-primaryBorderF grid grid-rows-[1fr,auto] gap-y-4 transition-all duration-300"
        :style="`width:${dashboardWidth}px;`"
      >
        <header class="p-4">
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
        </header>
        <footer class="p-4">
          <ItemAside @click="logout" text="Sair da conta">
            <template #icon>
              <LogoutIcon size="20" />
            </template>
          </ItemAside>
        </footer>
      </section>
      <div class="flex-1 w-[calc(100% - 280px)] overflow-x-auto h-full">
        <header class="h-full">
          <main class="bg-subSecondaryColorF overflow-x-auto p-3 h-full relative">
            <NuxtPage />
          </main>
        </header>
      </div>
    </aside>
  </div>

  <Loading :visibility="loading" />
  <AddFrameModal @closeModal="handleAddFrameModal.close" :isOpen="isAddFrameModalVisible" />
  <SpeedInsights />
</template>

<script setup>
import LogoutIcon from "@/components/Common/Icons/LogoutIcon.vue";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "#vue-router";
import BurguerButton from "../components/Features/dashboard/BurguerButton.vue";
import Loading from "~/components/Common/Loadings/Loading.vue";
import DividerDefault from "~/components/Common/Dividers/DividerDefault.vue";
import AccountModal from "../components/Features/dashboard/AccountModal.vue";
import NotificationModal from "~/components/Common/Notifications/Popups/NotificationModal";
import ItemAside from "../components/Features/dashboard/ItemAside.vue";
import HomeIcon from "~/components/Common/Icons/HomeIcon.vue";
import DropdownProjets from "@/components/Common/Dropdown/DropdownProjects";
import DropdownItem from "@/components/Common/Dropdown/DropdownProjects/DropdownItem.vue";
import ControlPanelIcon from "~/components/Common/Icons/ControlPanelIcon.vue";
import { useWorkspace } from "@/stores/workspace";
import SearchEngine from "@/components/Common/Search/SearchEngine";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { storeToRefs } from "pinia";
import AddFrameButton from "../components/Features/dashboard/AddFrameButton.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText";
import AddFrameModal from "../components/Features/dashboard/AddFrameModal.vue";

definePageMeta({
  middleware: "auth",
});

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

const auth = getAuth();
const router = useRouter();
const { frames } = storeToRefs(useWorkspace());
const isAddFrameModalVisible = ref(false);
const loading = ref(true);
const totalWidthDashboard = "260";
const dashboardWidth = ref(totalWidthDashboard);

const logout = async () => {
  loading.value = true;

  await signOut(auth).then(() => {
    loading.value = false;

    const isAuthenticated = useCookie("token");
    isAuthenticated.value = false; // blocks the routes

    deleteAllCookies();
    frames.value = []; // Reset
    router.push("/");
  });
};

const dashboardToggle = () => {
  if (dashboardWidth.value === totalWidthDashboard) return (dashboardWidth.value = "0");

  return (dashboardWidth.value = totalWidthDashboard);
};

onMounted(() => {
  const isAuthenticated = useCookie("token");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      loading.value = false;
    } else {
      isAuthenticated.value = false;
      router.push("/");
    }
  });
});

const handleAddFrameModal = {
  open: () => (isAddFrameModalVisible.value = true),
  close: () => (isAddFrameModalVisible.value = false),
};
</script>