<template>
  <header class="bg-subSecondaryColorF">
    <div class="container m-auto px-4">
      <nav class="py-10">
        <SecondaryButton @click="$router.back()"> Voltar </SecondaryButton>
      </nav>
      <main>
        <h1 class="text-center text-slate-50 font-bold text-4xl pt-5 mb-12">
          Termos
        </h1>
        <section>
          <div class="max-w-3xl m-auto text-zinc-200 py-6">
            <p class="mb-3"><strong>Última Atualização:</strong> 18/01/2025</p>

            <div class="mb-3">
              <h2 class="text-xl font-bold">1. Aceitação dos Termos</h2>
              <p class="py-3">
                Ao utilizar o software e os serviços da FastDevelopment, você
                concorda com os termos e condições aqui descritos. Caso não
                concorde, abstenha-se de utilizar a FastDevelopment.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">2. Uso do Software</h2>
              <p class="py-3">
                <strong>2.1 Licença de Uso:</strong> Concedemos a você uma
                licença limitada, não exclusiva e intransferível para utilizar a
                FastDevelopment em conformidade com estes termos.
              </p>
              <p class="py-3">
                <strong>2.2 Restrições:</strong> Você não pode: (a) utilizar a
                FastDevelopment de forma ilegal; (b) sublicenciar (c) descompilar ou realizar
                engenharia reversa do software.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">3. Informações de Conta</h2>
              <p class="py-3">
                <strong>3.1 Registro:</strong> É sua responsabilidade garantir
                que as informações fornecidas na criação de sua conta estejam
                corretas e atualizadas.
              </p>
              <p class="py-3">
                <strong>3.2 Segurança da Conta:</strong> Você deve proteger suas
                credenciais de acesso e é responsável por todas as atividades
                realizadas em sua conta.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">4. Privacidade</h2>
              <p class="py-3">
                <strong>4.1 Coleta de Dados:</strong> A coleta e o uso de
                informações pessoais estão sujeitos à nossa Política de
                Privacidade.
              </p>
              <p class="py-3">
                <strong>4.2 Comunicações:</strong> Ao utilizar a
                FastDevelopment, você concorda em receber comunicações
                relacionadas aos serviços oferecidos.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">
                5. Limitações de Responsabilidade
              </h2>
              <p class="py-3">
                O FastDevelopment é fornecido "no estado em que se encontra",
                sem garantias explícitas ou implícitas quanto à sua precisão,
                confiabilidade ou adequação a fins específicos.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">6. Alterações nos Termos</h2>
              <p class="py-3">
                Reservamo-nos o direito de modificar ou revisar estes Termos de
                Serviço a qualquer momento, notificando previamente os usuários.
              </p>
            </div>

            <div class="mb-3">
              <h2 class="text-xl font-bold">7. Contato</h2>
              <p class="py-3">
                Caso tenha dúvidas ou preocupações relacionadas a estes Termos
                de Serviço, entre em contato conosco através do seguinte e-mail:
              </p>
              <p class="py-3">E-mail: contato.fastdevelopment@gmail.com</p>
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
import SecondaryButton from "~/components/common/Buttons/SecondaryButton.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

useHead({
  title: "Termos",
});
</script>
