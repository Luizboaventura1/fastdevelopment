<template>
  <div class="relative w-[45px]">
    <div
      :style="`width: ${props.size}px;height: ${props.size}px;`"
      class="rounded-full overflow-hidden cursor-pointer"
    >
      <img
        @click.stop="toggleModal"
        class="w-full"
        :src="userPhoto"
        alt="User"
      />
    </div>
    <div class="absolute z-40 bottom-9 right-5">
      <OptionsModal
        class="options-modal-container"
        @click.stop
        :stateModal="stateModal"
      >
        <template #nav>
          <TitleOptionsModal> Sua conta </TitleOptionsModal>
          <CloseButton :event="closeOptionsModal" size="16" />
        </template>

        <template #buttons>
          <ActionLinkOptionsModal link="/dashboard/profile">
            Ver perfil
          </ActionLinkOptionsModal>
          <ActionOptionsModal
            :event="() => openWarningMessage('Sair da conta?')"
          >
            Fazer logout
          </ActionOptionsModal>
        </template>
      </OptionsModal>
    </div>
  </div>
  <Loading :visibility="loading" />
  <WarningMessage
    :message="warningMessage"
    :state="stateWarningMessage"
    :cancel="cancelWarningMessage"
    :confirm="confirmWarningMessage"
  />
</template>

<script setup>
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import OptionsModal from "@/components/Common/Notifications/Popups/OptionsModal";
import ActionOptionsModal from "@/components/Common/Notifications/Popups/OptionsModal/components/ActionOptionsModal.vue";
import TitleOptionsModal from "@/components/Common/Notifications/Popups/OptionsModal/components/TitleOptionsModal.vue";
import CloseButton from "@/components/Common/FeedBack/CloseButton.vue";
import Loading from "@/components/Common/Loadings/Loading.vue";
import { signOut } from "firebase/auth";
import WarningMessage from "@/components/Common/FeedBack/WarningMessage.vue";
import ActionLinkOptionsModal from "@/components/Common/Notifications/Popups/OptionsModal/components/ActionLinkOptionsModal.vue";
import { useWorkspace } from "~/stores/workspace";

let props = defineProps({
  size: String,
});

const router = useRouter();
let loading = ref(false);

const auth = getAuth();
const db = getFirestore();

let userName = ref("");
let userPhoto = ref(undefined);
let userEmail = ref("");

onMounted(() => {
  // get user photo

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email;
      userPhoto.value = user.photoURL;

      // get name

      const q = query(
        collection(db, "users"),
        where("email", "==", userEmail.value)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        userName.value = doc.data().name;
      });
    }
  });
});

let stateModal = ref(false);

//When you click outside the modal it will close
const closeOptionsModal = () => (stateModal.value = false);

const toggleModal = () => {
  stateModal.value = !stateModal.value;
};

const handleClickOutside = (event) => {
  const modalElement = document.querySelector(".options-modal-container");

  if (modalElement && !modalElement.contains(event.target)) {
    stateModal.value = false;
  }
};

onMounted(() => {
  document.body.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.body.removeEventListener("click", handleClickOutside);
});

// Logout

const logout = async () => {
  loading.value = true;

  // end the session
  await signOut(auth).then(() => {
    loading.value = false; // Disable Loading

    // blocks the routes
    const logged = useCookie("token");
    logged.value = false;

    deleteAllCookies();
    useWorkspace().frames = [] // Reset

    // back home
    router.push("/");
  });
};

// Warning message Card

let stateWarningMessage = ref(false);
let warningMessage = ref("");

const openWarningMessage = (message) => {
  stateWarningMessage.value = true;
  warningMessage.value = message;
};

const cancelWarningMessage = () => (stateWarningMessage.value = false);

const confirmWarningMessage = () => {
  logout();
  stateWarningMessage.value = false;
};
</script>

<style lang="scss" scoped>
.avatar {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
