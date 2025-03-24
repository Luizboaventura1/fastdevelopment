<template>
  <footer class="bg-subSecondaryColorF py-8">
    <div class="container m-auto px-3">

      <div class="logo">
        <div class="logo-fastdavelopment text-violet-500 text-lg font-medium">
          <LogoFastDevelopment
            size="40"
          />
        </div>
      </div>

      <div class="divider w-full h-[1px] bg-secondaryColorF my-6"></div>

      <div class="flex-1 sm:flex items-center y-3 text-xs text-white">
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <NuxtLink
            to="/privacy-policy"
            class="mx-2 hover:underline"
          >
            Política de privacidade
          </NuxtLink>
        </div>
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <NuxtLink
            to="/terms"
            class="mx-2 hover:underline"
          >
            Termos
          </NuxtLink>
        </div>
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <span
            class="mx-2"
          >
            Copyright &copy; {{ new Date().getFullYear() }} FastDevelopment
          </span>
        </div>
        <div class="ms-auto w-full sm:w-auto mb-3 sm:mb-0">
          <p class="text-sm mx-2 mt-4 sm:mt-0">Desenvolvido por
            <a
              class="font-bold hover:underline"
              target="_blank"
              href="https://github.com/Luizboaventura1"
            >
              Luiz
            </a>
          </p>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import LogoFastDevelopment from '../components/Common/Icons/LogoFastDevelopment.vue';
</script>