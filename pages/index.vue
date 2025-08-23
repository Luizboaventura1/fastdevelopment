<template>
  <div class="overflow-hidden">
    <Header>
      <NuxtLayout name="navbar" />

      <div class="flex justify-center my-8 md:my-12">
        <section class="w-full max-w-4xl text-center">
          <h1
            class="relative z-10 font-semibold text-3xl md:text-4xl lg:text-5xl text-textPrimaryColorF mb-6"
          >
            Criada para <span class="text-gradient">facilitar</span> a gestão dos
            <span class="text-gradient">seus</span> projetos pessoais
          </h1>
          <h2
            class="relative z-10 text-textPrimaryColorF text-md md:text-lg lg:text-xl mt-8 md:mt-12 mb-4 md:mb-6"
          >
            Uma ferramenta moderna, simples e eficiente para <br class="hidden md:block" />
            gerenciar seus projetos
          </h2>
          <div class="inline-flex relative mt-6">
            <img
              v-if="!isAuthenticated"
              class="absolute hidden sm:block -right-36 md:-right-52 bottom-12 w-32 md:w-44"
              :src="OneHundredPercentFreeIcon"
              alt="One Hundred Percent Free Icon"
            />
            <PrimaryButton @click="handleCTAButton" large>
              {{ isAuthenticated ? "Ir para o dashboard" : "Crie sua conta" }}
            </PrimaryButton>
          </div>
        </section>
      </div>
      <div class="flex justify-center">
        <section class="mt-6 w-full max-w-7xl">
          <img
            src="../assets/example-kanban.webp"
            class="border-2 border-zinc-800 rounded-2xl"
            alt="Kanban board"
          />
        </section>
      </div>
    </Header>

    <Section>
      <header class="text-center py-16 pp-12">
        <MainTitle lg>
          Porque escolher a <span class="text-gradient">FastDevelopment</span>?
        </MainTitle>
      </header>
      <main class="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <AnimatedCard>
          <template #icon>
            <LightningIcon :size="50" />
          </template>
          <PrimaryText lg>Alta Produtividade</PrimaryText>
          <SecondaryText md>
            Utilizamos a metodologia Kanban para garantir um fluxo de trabalho ágil, eficiente e com
            foco em resultados, aumentando significativamente a produtividade na execução das
            tarefas.
          </SecondaryText>
        </AnimatedCard>

        <AnimatedCard>
          <template #icon>
            <HomeIcon :size="50" />
          </template>
          <PrimaryText lg>Interface Moderna</PrimaryText>
          <SecondaryText md>
            Desenvolvida com foco na simplicidade, nossa interface prioriza a usabilidade e elimina
            distrações, proporcionando uma experiência limpa e objetiva.
          </SecondaryText>
        </AnimatedCard>

        <AnimatedCard>
          <template #icon>
            <KanbanIcon :size="50" />
          </template>
          <PrimaryText lg>Metodologia Kanban</PrimaryText>
          <SecondaryText md>
            Adotamos o Kanban por sua praticidade e flexibilidade. É fácil de usar e pode ser
            integrado a projetos em andamento sem atritos.
          </SecondaryText>
        </AnimatedCard>
      </main>
    </Section>

    <Section class="py-32">
      <div
        class="grid gap-4 grid-cols-1 xl:grid-cols-2 border border-darkGrayBorderF rounded-2xl overflow-hidden"
      >
        <section class="flex items-center xl:justify-center p-8">
          <main class="w-full max-w-lg xl:max-w-xl">
            <h1 class="font-semibold text-textPrimaryColorF text-4xl">
              Visualize todo o fluxo de trabalho com os quadros
              <span class="text-gradient">Kanban</span>
            </h1>
            <h2 class="text-textPrimaryColorF font-medium text-lg my-6">
              Crie listas, cartões, etiquetas, prazos e muito mais!
            </h2>
            <PrimaryButton @click="handleCTAButton" large>{{
              isAuthenticated ? "Ir para o dashboard" : "Criar conta"
            }}</PrimaryButton>
          </main>
        </section>

        <section class="relative overflow-hidden">
          <div class="absolute transition-all duration-1000 w-full h-2 -top-36 xl:top-0 xl:-left-12 xl:h-full xl:w-2 bg-subSecondaryColorF image-shadow-top xl:image-shadow-left"></div>
          <img class="w-full" src="../assets/example-kanban.webp" alt="Kanban board" />
        </section>
      </div>
    </Section>
  </div>

  <Section class="md:text-center">
    <MainTitle lg>Ta esperando o que? Comece a usar hoje!</MainTitle>
    <SecondaryText class="my-5">
      Crie sua conta e comece a usar nossa ferramenta 100% gratuita.
    </SecondaryText>
    <div class="block md:flex gap-4 justify-center">
      <PrimaryButton
        @click="$router.push('/auth/login')"
        large
        class="w-full md:w-auto mb-4 md:mb-0"
      >
        {{ isAuthenticated ? "Ir para o dashboard" : "Criar conta" }}
      </PrimaryButton>
      <BuyMeACoffe class="w-full md:w-auto"> Buy me a coffee </BuyMeACoffe>
    </div>
  </Section>
  <NuxtLayout name="footer" />
  <SpeedInsights />
</template>

<script setup>
import BuyMeACoffe from "@/components/Common/Buttons/BuyMeACoffe.vue";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";
import MainTitle from "@/components/Common/Text/MainTitle";
import SecondaryText from "@/components/Common/Text/SecondaryText";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import OneHundredPercentFreeIcon from "../assets/OneHundredPercentFreeIcon.svg";
import Header from "../components/Features/home/Header.vue";
import Section from "../components/Features/home/Section.vue";
import AnimatedCard from "~/components/Features/home/AnimatedCard.vue";
import PrimaryText from "../components/Common/Text/PrimaryText";
import LightningIcon from "~/components/Features/home/icons/LightningIcon.vue";
import HomeIcon from "../components/Features/home/icons/HomeIcon.vue";
import KanbanIcon from "~/components/Features/home/icons/KanbanIcon.vue";

const auth = getAuth();
const { gtag } = useGtag();
const isAuthenticated = ref(false);
const router = useRouter();

const redirectToDashboard = () => {
  if (isAuthenticated.value) {
    router.push("/dashboard/workspace");
    return;
  }

  router.push("/auth/login");
};

const handleCTAButton = () => {
  redirectToDashboard();

  gtag("event", "click", {
    event_category: "CTA Home",
  });
};

useHead({
  title: "FastDevelopment",
  meta: [
    {
      name: "description",
      content:
        "Aumente a eficiência do desenvolvimento dos seus projetos com nossa ferramenta simples, prática e moderna.",
    },
    { name: "keywords", content: "FastDevelopment, Kanban, desenvolvimento ágil, jira, trello" },
    { name: "author", content: "Luiz" },
  ],
});

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      return;
    }

    isAuthenticated.value = false;
  });
});
</script>

<style lang="scss" scoped>
$primary-color: #8257e5;

.line-headline {
  text-decoration: underline;
  text-decoration-color: $primary-color;
}

.text-gradient {
  background-image: linear-gradient(to right, #8257e5, #513591);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.image-shadow-left {
  box-shadow: 0px 0px 80px 240px #121214;
}

.image-shadow-top {
  box-shadow: 0px 0px 80px 240px #121214;
}
</style>
