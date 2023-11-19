<template>
  <Header>
    <NuxtLayout name="navbar" />
    <Main>
      <h1 class="text-4xl md:text-5xl text-center text-slate-50 font-bold mb-4">
        Aumente sua produtividade <br />
        com a
        <span class="line-headline"> FastDevelopment </span>
      </h1>
      <p
        class="text-zinc-300 mb-5 max-w-lg m-auto text-sm md:text-base text-center"
      >
        Tenha um rápido desenvolvimento e ganho de produtividade com nossa
        ferramenta completa de desenvolvimento ágil.
      </p>
      <div class="flex justify-center w-full">
        <StartButton :event="startButton">
          {{ logged ? "Ir para o dashboard" : "Começar" }}
        </StartButton>
      </div>
    </Main>
  </Header>

  <SectionBenefits />

  <Section>
    <div class="flex-1 md:flex py-14 px-4">
      <div class="md:w-6/12">
        <h1 class="text-slate-50 text-2xl md:text-3xl font-bold mb-5">
          Utilizamos a metodologia Kanban para o gerenciamento de tarefas
        </h1>
        <p class="text-slate-200 mb-5">
          Tenha uma melhor visualização do trabalho em andamento e controle
          melhor suas tarefas.
        </p>
        <ul class="text-slate-50">
          <li class="flex gap-x-3 mb-1">
            <svg
              class="h-6 w-5 flex-none text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Facilidade de Uso
          </li>
          <li class="flex gap-x-3 mb-1">
            <svg
              class="h-6 w-5 flex-none text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Economize tempo
          </li>
          <li class="flex gap-x-3 mb-1">
            <svg
              class="h-6 w-5 flex-none text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Aplicabilidade simples
          </li>
          <li class="flex gap-x-3 mb-1">
            <svg
              class="h-6 w-5 flex-none text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Flexivel
          </li>
        </ul>
      </div>

      <div class="md:w-6/12 p-5">
        <img
          class="w-full rounded-xl shadow-lg"
          src="../assets/Kanban board.svg"
          alt="Kanban board"
        />
      </div>
    </div>
  </Section>

  <Section>
    <div class="flex flex-col-reverse md:flex-row py-9">
      <div class="md:w-6/12 p-5">
        <h1 class="text-slate-50 font-bold text-4xl mb-5">
          Gerencie melhor seus projetos com mais rapidez
        </h1>
        <StartButton :event="startButton"> Comece hoje grátis </StartButton>
      </div>
      <div class="md:w-6/12 p-6">
        <img
          class="w-full"
          src="../assets/site_stats.svg"
          alt="Image Site stats"
        />
      </div>
    </div>
  </Section>

  <Pricing />

  <NuxtLayout name="footer" />
</template>

<script setup>
import Header from "./home/Header.vue";
import Main from "./home/Main.vue";
import StartButton from "~/components/Buttons/StartButton.vue";
import SectionBenefits from "./home/SectionBenefits.vue";
import Section from "./home/Section.vue";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Pricing from "./home/Pricing.vue";

const auth = getAuth();

const startButton = () => {
  if (logged.value) {
    location.href = "/dashboard/frame";
  } else {
    location.href = "/auth/register";
  }
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

//if the token is true it takes the user to the desktop

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
