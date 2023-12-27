<template>
  <Header>
    <NuxtLayout name="navbar" />
    <Main class="text-center grid grid-cols-1 gap-y-7 max-w-2xl m-auto">
      <MainTitle class="text-3xl sm:text-4xl md:text-5xl">
        Aumente sua produtividade <br />
        com a
        <span class="line-headline"> FastDevelopment </span>
      </MainTitle>
      <SecondaryText class="py-4 text-sm sm:text-md md:text-lg">
        Melhore o controle de gestão dos seus projetos com facilidade. Crie sua conta Hoje!
      </SecondaryText>
      <PrimaryButton @click="startButton" large>
        {{ logged ? "Ir para o dashboard" : "Começar!" }}
      </PrimaryButton>
    </Main>
  </Header>

  <NuxtLayout name="footer" />
  <SpeedInsights />
</template>

<script setup>
import Header from "./home/Header.vue";
import Main from "./home/Main.vue";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import MainTitle from "@/components/Common/Text/MainTitle";
import SecondaryText from "@/components/Common/Text/SecondaryText";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const auth = getAuth();

const startButton = () => {
  if (logged.value) router.push("/dashboard/workspace");
  else router.push("/auth/register");
};

// SEO

useHead({
  title: "FastDevelopment",
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

const logged = ref(useCookie("token").value);

onAuthStateChanged(auth, (user) => {
  if (user) logged.value = true;
  else logged.value = false;
});

// if the token is true it takes the user to the desktop

let router = useRouter();

onBeforeMount(() => {
  if (logged.value) router.push("/dashboard/workspace");
});
</script>

<style lang="scss">
$primary-color: #8257e5;

.line-headline {
  text-decoration: underline;
  text-decoration-color: $primary-color;
}
</style>
