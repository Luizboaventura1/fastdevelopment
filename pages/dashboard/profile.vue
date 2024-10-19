<template>
  <header
    class="h-full p-4 rounded-lg w-full overflow-y-auto grid gap-y-4 grid-rows-[auto,auto,2fr]"
  >
    <nav class="px-4 py-7 rounded-lg flex gap-5 items-center">
      <img
        :src="userInfo?.photoUrl"
        alt="Img user"
        class="rounded-full w-[90px] h-[90px] ring-1 ring-zinc-700"
      />

      <div>
        <h1 class="w-full text-white font-medium text-xl">
          {{ userInfo?.name }}
        </h1>
        <span class="text-textSecondaryColorF text-sm font-medium">{{
          userInfo?.email
        }}</span>
      </div>
    </nav>
    <main>
    <h1 class="text-textSecondaryColorF">
      Página do perfil ainda não criada. Quer contribuir?
      <a
        class="text-blue-400 hover:text-blue-500 underline decoration-blue-400 hover:decoration-blue-500"
        target="_blank"
        href="https://github.com/Luizboaventura1/fastdevelopment?tab=readme-ov-file#how-to-contribute-"
      >clique aqui</a
      >
    </h1>
  </main>
  </header>
  <SpeedInsights />
</template>

<script setup>
import { useWorkspace } from "~/stores/workspace";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

let userInfo = useCookie("userInfo");

onMounted(() => {
  useWorkspace()
    .workspace()
    .then((data) => {
      if (!userInfo.value) {
        useCookie("userInfo").value = {
          name: data.name,
          email: data.email,
          photoUrl: data.photoUrl,
        };
      } 
    });
});
</script>
