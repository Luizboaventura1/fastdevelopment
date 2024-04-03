<template>
  <div class="dashboard">
    <nav class="h-[60px] bg-secondaryColorF flex items-center gap-3 px-4">
      <div class="w-2/12 flex items-center">
        <BurguerButton :event="dashboardToggle" />
      </div>

      <div class="w-full flex justify-center">
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

const auth = getAuth();
const router = useRouter();

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
    useWorkspace().frames = [] // Reset
    router.push("/");
  });
};

const totalWidthDashboard = "260"
let dashboardWidth = ref(totalWidthDashboard);

const dashboardToggle = () => {
  if (dashboardWidth.value === totalWidthDashboard) return (dashboardWidth.value = "0");

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

let frames = ref(useWorkspace().frames || []);

watch(
  useWorkspace().frames,
  () => {
    frames.value = useWorkspace().frames;
  },
  { deep: true }
);
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
