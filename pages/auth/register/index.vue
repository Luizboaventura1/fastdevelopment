<template>
  <TemplateAuth>
    <form class="py-5 px-9 bg-secondaryColorF w-full max-w-xl rounded-md">
      <h1 class="text-slate-50 text-2xl font-bold py-4 mb-4">Criar conta</h1>
      <GoogleButton :event="loginWithGoogle"
        >Criar conta com Google</GoogleButton
      >
      <div class="text-center mt-4">
        <p class="text-white text-sm">
          Tem uma conta?
          <NuxtLink
            class="text-violet-500 hover:text-primaryColorF"
            to="/auth/login"
          >
            Fazer login
          </NuxtLink>
        </p>
      </div>
    </form>
  </TemplateAuth>
  <Loading :visibility="loading" />
  <ToastError :state="stateToastError" :message="toastMessage" />
</template>

<script setup>
import TemplateAuth from "../components/TemplateAuth.vue";
import GoogleButton from "../components/GoogleButton.vue";
import { signInWithPopup, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "#vue-router";
import Loading from "~/components/Common/Loadings/Loading.vue";
import ToastError from "@/components/Common/Toast/Error";

const auth = getAuth();

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
        await addUserInFirestore(displayName, email, "", uid);
      }

      // go to dashboard
      router.push("/dashboard/workspace");
    }
  } catch (error) {
    loading.value = false;
    openToast('Verifique sua conexão!')
  }
};
  
useHead({
  title: "Criar conta",
});


let stateToastError = ref(false)
let toastMessage = ref("")

const openToast = (message) => {
  stateToastError.value = true
  toastMessage.value = message

  setTimeout(() => stateToastError.value = false, 3000)
}
</script>
