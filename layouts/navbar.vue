<template>
  <nav class="h-[120px]"></nav>
  <div class="fixed w-full left-0 top-0 z-50">
    <div class="container mx-auto px-6 pt-4 transition-all duration-500">
      <nav
        class="p-3 flex justify-between items-center bg-subSecondaryColorF/80 backdrop-blur border border-neutral-800 rounded-lg"
      >
        <div class="flex justify-center">
          <h1 class="flex gap-4 items-center text-textPrimaryColorF font-medium">
            <FastDevelopmentLogoIcon size="32" />
            FastDevelopment
          </h1>
        </div>

        <LoginButton :event="login"> Entrar </LoginButton>
      </nav>
    </div>
  </div>
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
