<template>
  <header class="bg-subSecondaryColorF">
    <div class="container m-auto px-4">
      <nav class="py-10">
        <SecondaryButton @click="$router.back()"> Voltar </SecondaryButton>
      </nav>
      <main>
        <h1 class="text-center text-slate-50 font-bold text-4xl pt-5 mb-12">
          Política de Privacidade
        </h1>
        <section>
          <div class="max-w-3xl m-auto text-zinc-200 py-6">
            <p class="mb-3"><strong>Última Atualização:</strong> 18/01/2025</p>

            <div class="mb-3">
              <h2 class="mb-4 text-xl font-bold">1. Informações Coletadas</h2>
              <p class="text-xl py-3">
                <strong>1.1 Informações de Registro</strong>
              </p>
              <p>
                Para utilizar os serviços da FastDevelopment, solicitamos que
                você crie uma conta. Durante o processo de registro, coletamos
                seu nome, endereço de e-mail e demais informações de contato
                necessárias.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">2. Como Usamos Suas Informações</h2>
              <p class="py-3">
                As informações coletadas são utilizadas para personalizar sua
                experiência no FastDevelopment, oferecer suporte ao cliente,
                aprimorar nossos serviços e enviar atualizações relevantes.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">
                3. Compartilhamento de Informações
              </h2>
              <p class="py-3">
                Não compartilhamos suas informações pessoais com terceiros sem o
                seu consentimento expresso, exceto quando necessário para
                atender a obrigações legais.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">4. Proteção de Dados</h2>
              <p class="py-3">
                A FastDevelopment adota medidas de segurança rigorosas para
                proteger suas informações pessoais contra acesso não autorizado,
                uso indevido ou divulgação.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">5. Seus Direitos e Escolhas</h2>
              <p class="py-3">
                Você tem o direito de acessar, corrigir ou excluir suas
                informações pessoais a qualquer momento. Para exercer esses
                direitos, entre em contato conosco.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">6. Contato</h2>
              <p class="py-3">
                Caso tenha dúvidas ou preocupações relacionadas à privacidade,
                entre em contato conosco através do e-mail:
              </p>
              <p>E-mail: contato.fastdevelopment@gmail.com</p>
            </div>

            <div class="mb-3">
              <p class="py-3">
                Esta Política de Privacidade descreve nossas práticas em relação
                às informações pessoais que coletamos e como as utilizamos. Ao
                continuar utilizando o FastDevelopment, você concorda com os
                termos desta política.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </header>
  <NuxtLayout name="footer" />
  <SpeedInsights />
</template>

<script setup>
import SecondaryButton from "~/components/Common/Buttons/SecondaryButton.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

useHead({
  title: "Política de Privacidade",
});
</script>
