<template>
  <header class="grid grid-cols-3 w-screen h-screen bg-black">
    <div class="bg-img hidden lg:block"></div>
    <div
      class="col-span-3 flex justify-center lg:col-span-2 h-full form-container relative overflow-hidden"
    >
      <div class="absolute block lg:hidden left-0 top-0 h-full w-full bg-img">
        <div class="w-full h-full bg-opacity-60 bg-black"></div>
      </div>
      <div
        class="absolute w-full left-0 top-0 z-10 mx-auto px-4 md:px-14 flex justify-center items-center h-full"
      >
        <form class="w-full max-w-[400px] rounded-md py-6 px-7">
          <h1 class="text-textPrimaryColorF text-2xl font-bold py-4 mb-4">Entrar</h1>
          <GoogleButton :event="loginWithGoogle">Login com Google</GoogleButton>
        </form>
      </div>
    </div>
  </header>

  <Loading :visibility="loading" />
  <Toast :toast="toast">
    <template #icon>
      <Alert size="24" />
    </template>
  </Toast>
</template>

<script setup>
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "../components/GoogleButton.vue";
import { useRouter } from "#vue-router";
import Loading from "~/components/Common/Loadings/Loading.vue";
import Toast from "@/components/Common/Notifications/Toast"
import Alert from "~/components/Common/Icons/Alert.vue";

const auth = getAuth();
const toast = useToast();

const router = useRouter();
let loading = ref(false);

const loginWithGoogle = async () => {
  loading.value = true;

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { uid, email, displayName } = result.user;

      // create token
      const logged = useCookie("token");
      logged.value = true;

      if (!(await checkIfTheUserExists(email))) {
        await addUserInFirestore(displayName, email, uid);
      }

      // go to dashboard
      router.push("/dashboard/workspace");
    }
  } catch (error) {
    loading.value = false;
    toast.add({
      title: 'Verifique sua conexão!',
      timeout: 2500
    })
  }
};

useHead({
  title: "Login",
});
</script>

<style scoped lang="scss">
.bg-img {
  background-image: url(../../../assets/astronauta-de-vista-lateral-vestindo-traje-espacial.jpg);
  background-size: cover;
  background-position: center top;
  filter: contrast(1.2);
}
</style>
