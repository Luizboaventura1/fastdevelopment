<template>
  <nav class="h-[70px] flex">
    <div class="w-4/12 flex items-center">
      <div class="logo-fastdavelopment text-violet-500 text-lg font-medium">
        &lt;<span class="text-white">FastDev</span>/&gt;
      </div>
    </div>
    <div class="w-8/12 flex items-center justify-end">
      <LoginButton>
        Entrar
      </LoginButton>
      <RegisterButton>
        Criar conta
      </RegisterButton>
    </div>
  </nav>
</template>

<script setup>
import LoginButton from './LoginButton.vue';
import RegisterButton from './RegisterButton.vue';


</script>

<style lang="scss" scoped>

</style>