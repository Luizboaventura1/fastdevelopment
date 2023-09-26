<template>
  <Header>
   <NavBar />
   <Main>
    <h1
      class="text-4xl md:text-5xl text-center text-slate-50 font-bold mb-4"
    >
      Aumente sua produtividade <br> com a 
      <span class="line-headline"
      >
        FastDevelopment
      </span>
    </h1>
    <p
      class="text-zinc-300 mb-5 max-w-lg m-auto text-sm md:text-base text-center"
    >
      Tenha um rápido desenvolvimento e ganho 
      de produtividade com nossa
      ferramenta completa de desenvolvimento ágil.
    </p>
    <div class="flex justify-center w-full">
      <StartButton>
        Começar
      </StartButton>
    </div>
   </Main>
  </Header>

  <SectionBenefits />

  <Section>
    <div class="flex flex-col-reverse md:flex-row py-9">
      <div class="md:w-6/12 p-5">
        <h1
          class="text-slate-50 font-bold text-4xl mb-5"
        >
          Gerencie melhor seus projetos com mais rapidez
        </h1>
        <StartButton>
          Comece hoje grátis
        </StartButton>
      </div>
      <div class="md:w-6/12 p-6">
        <img
          class="w-full"
          src="../assets/site_stats.svg"
          alt="Image Site stats"
        >
      </div>
    </div>
  </Section>

  <div class="bg-secondaryColorF py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2 class="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Comece a usar hoje!</h2>
        <p class="mt-6 text-lg leading-8 text-neutral-300">Obtenha um sistema completo para o gerenciamento de tarefas de pequeno e grande porte para uso pessoal ou empresarial.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-subSecondaryColorF sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-slate-50">Preço exclusivo</h3>
          <p class="mt-6 text-base leading-7 text-zinc-300">Tenha acesso completo a todas as funcionalidades do nosso sistema se você fazer seu cadastro hoje!</p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-slate-50">Oque está incluido?</h4>
            <div class="h-px flex-auto bg-gray-100"></div>
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-50 sm:grid-cols-2 sm:gap-6">
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Acesso completo
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Uso vitalício
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Ganho de produtividade
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Acesso a novos recursos
            </li>
          </ul>
        </div>
        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div class="rounded-2xl bg-subSecondaryColorF py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-slate-50">Paque apenas uma vez!</p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-slate-50">R$ 0</span>
                <span class="text-sm font-semibold leading-6 tracking-wide text-slate-100">BRL</span>
              </p>
              <a href="#" class="mt-10 block w-full rounded-md bg-primaryColorF px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Garantir acesso</a>
              <p class="mt-6 text-xs leading-5 text-zinc-400">Oferta disponível por tempo limitado!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />

</template>

<script setup>
import {useTokenStore} from '../stores/token.js'
import {db} from '@/firebase'
import {addDoc,collection} from 'firebase/firestore'
import Header from '~/components/Home/Header.vue';
import NavBar from '~/components/Home/NavBar.vue';
import Main from '~/components/Home/Main.vue';
import StartButton from '~/components/Home/StartButton.vue';
import SectionBenefits from '~/components/Home/SectionBenefits.vue';
import Section from '~/components/Home/Section.vue';
import Footer from '~/components/Home/Footer.vue';
const store = useTokenStore()

console.log(store.token)

const addItem = () => {
  addDoc(collection(db, "dado"), {
    nome: 'Luiz'
  });

}


</script>

<style lang="scss">
$primary-color: #8257e5;

.line-headline {
  text-decoration: underline;
  text-decoration-color: $primary-color;
}

</style>