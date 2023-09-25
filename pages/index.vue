<template>
  <Header>
   <NavBar />
   <Main>
    <h1
      class="text-5xl text-center text-slate-50 font-bold mb-4"
    >
      Aumente sua produtividade <br> com a FastDevelopment
    </h1>
    <div class="mb-5">
      <p
        class="text-zinc-300 text-center"
      >
        Tenha um rápido desenvolvimento e ganho 
        de produtividade com nossa <br>
        ferramenta completa de desenvolvimento ágil.
      </p>
    </div>
    <div class="flex justify-center w-full">
      <StartButton>
        Começar
      </StartButton>
    </div>
   </Main>
  </Header>
  <SectionBenefits />
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
$secondary-color: #202024;
$sub-secondary-color: #121214;


</style>