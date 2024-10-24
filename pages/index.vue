<template>
  <div class="overflow-hidden">
    <Header>
      <NuxtLayout name="navbar" />
      <Main>
        <div>
          <h1
            class="font-medium border-l-2 border-primaryColorF text-white ps-3 mb-5"
          >
            FastDevelopment
          </h1>
          <MainTitle class="text-3xl sm:text-3xl md:text-4xl">
            Acelere o desenvolvimento dos seus projetos!
          </MainTitle>
          <SecondaryText
            class="py-6 font-normal text-500 text-sm sm:text-md md:text-base"
          >
            Ferramenta ágil para uso pessoal perfeita para quem quer aumentar a produtividade e gerenciar melhor os seus projetos.
          </SecondaryText>
          <PrimaryButton @click="handleStartButton" large>
            {{ logged ? "Ir para o dashboard" : "Começar" }}
          </PrimaryButton>
        </div>
        <div>
          <img
            src="../assets/example-kanban.webp"
            class="border-2 bg-kanban-img border-zinc-800 rounded-md"
            alt="Kanban board"
          />
        </div>
      </Main>
    </Header>
    <SectionBenefits />
    <Section class="py-14">
      <nav class="text-center">
        <MainTitle lg>Visualize todo o progresso</MainTitle>
        <div class="mt-10 flex justify-center">
          <img
            class="border-2 w-full md:w-[80%] border-zinc-800 rounded-md"
            src="../assets/example-kanban.webp"
            alt="Kanban board"
          />
        </div>
      </nav>
    </Section>
  </div>
  <Section>
    <div class="py-14 grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <MainTitle lg>
          Coloque etiquetas e dê uma descrição aos seus cartões
        </MainTitle>
        <SecondaryText class="my-6">
          Edite de forma simples e rápida seus cartões.
        </SecondaryText>
        <PrimaryButton @click="$router.push('/auth/login')" large>
          Testar agora
        </PrimaryButton>
      </div>
      <div>
        <img
          src="../assets/example-labels.webp"
          class="border-2 w-full md:w-[100%] border-zinc-800 rounded-md"
          alt="Kanban card"
        />
      </div>
    </div>
  </Section>
  <Section>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-14">
      <div
        class="grid grid-rows-[auto,1fr] w-full min-h-[120px] md:h-[150px] bg-zinc-900 rounded-lg p-5 shadow"
      >
        <nav>
          <h1 class="text-textPrimaryColorF font-bold">
            🚀 Fácil de implementar
          </h1>
        </nav>
        <div class="flex items-center">
          <SecondaryText>
            Implemente nossa ferramenta de forma fácil em um projeto já em
            andamento.
          </SecondaryText>
        </div>
      </div>
      <div
        class="grid grid-rows-[auto,1fr] w-full min-h-[120px] md:h-[150px] bg-zinc-900 rounded-lg p-5 shadow"
      >
        <nav>
          <h1 class="text-textPrimaryColorF font-bold">
            ✔ Totalmente gratuito
          </h1>
        </nav>
        <div class="flex items-center">
          <SecondaryText>
            Desfrute da nossa plataforma 100% gratuita sem pagar nada!
          </SecondaryText>
        </div>
      </div>
      <div
        class="grid grid-rows-[auto,1fr] w-full min-h-[120px] md:h-[150px] bg-zinc-900 rounded-lg p-5 shadow"
      >
        <nav>
          <h1 class="text-textPrimaryColorF font-bold">
            ⚙ Gerencie melhor as etapas do seu projeto
          </h1>
        </nav>
        <div class="flex items-center">
          <SecondaryText>
            Gestão eficiente e de fácil visualização do progresso.
          </SecondaryText>
        </div>
      </div>
    </div>
  </Section>
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
        Criar conta
      </PrimaryButton>
      <BuyMeACoffe class="w-full md:w-auto"> Buy me a coffee </BuyMeACoffe>
    </div>
  </Section>
  <NuxtLayout name="footer" />
  <SpeedInsights />
</template>

<script setup>
import BuyMeACoffe from "@/components/Common/Buttons/BuyMeACoffe.vue";
import Header from "./home/Header.vue";
import Main from "./home/Main.vue";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import MainTitle from "@/components/Common/Text/MainTitle";
import SecondaryText from "@/components/Common/Text/SecondaryText";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import SectionBenefits from "./home/SectionBenefits.vue";
import Section from "./home/Section.vue";

const auth = getAuth();
const { gtag } = useGtag();

const startButton = () => {
  if (logged.value) router.push("/dashboard/workspace");
  else router.push("/auth/login");
};

const handleStartButton = () => {
  startButton();

  gtag("event", "click", {
    event_category: "CTA Home",
  });
};

// SEO

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

<style lang="scss" scoped>
$primary-color: #8257e5;

.line-headline {
  text-decoration: underline;
  text-decoration-color: $primary-color;
}

.bg-kanban-img {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
</style>
