<template>
  <nav class="h-[70px] flex">
    <div class="w-4/12 flex items-center">
      <div class="logo-fastdavelopment text-violet-500 text-lg font-medium">
      </div>
    </div>
    <div class="w-8/12 flex items-center justify-end">
      <LoginButton
        :event="login"
      >
        Entrar
      </LoginButton>
      <RegisterButton
        :event="register"
      >
        Criar conta
      </RegisterButton>
    </div>div
  </nav>
</template>

<script setup>
import LoginButton from './LoginButton.vue';
import RegisterButton from './RegisterButton.vue';

const login = () => location.href = '/auth/login'

const register = () => location.href = '/auth/register'

</script>

<style lang="scss" scoped>

</style>