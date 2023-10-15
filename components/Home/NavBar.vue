<template>
  <nav class="h-[70px] flex">
    <div class="w-4/12 flex items-center">
      <div class="logo-fastdavelopment text-violet-500 text-lg font-medium">
        <LogoFastDevelopment
          size="40"
        />
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
    </div>
  </nav>
</template>

<script setup>
import LoginButton from './LoginButton.vue';
import RegisterButton from './RegisterButton.vue';
import LogoFastDevelopment from '../Common/LogoFastDevelopment.vue';

const login = () => location.href = '/auth/login'

const register = () => location.href = '/auth/register'

</script>

<style lang="scss" scoped>

</style>