<template>
  <nav class="h-[70px] flex px-0 lg:px-6">
    <div class="w-4/12 flex items-center">
      <div class="logo-fastdavelopment text-violet-500 text-lg font-medium">
        <FastDevelopmentLogoIcon size="40" />
      </div>
    </div>
    <div class="w-8/12 flex items-center justify-end">
      <LoginButton :event="login"> Entrar </LoginButton>
    </div>
  </nav>
</template>

<script setup>
import LoginButton from "~/components/Features/home/LoginButton.vue";
import FastDevelopmentLogoIcon from "../components/Common/Icons/FastDevelopmentLogo.vue";
import { useRouter } from "#vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const router = useRouter();

const login = () => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/dashboard/workspace");
      return;
    }

    router.push("/auth/login");
  });
};
</script>
