<template>
  <nav class="h-[70px] flex px-0 lg:px-6">
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
    </div>
  </nav>
</template>

<script setup>
import LoginButton from '@/pages/home/LoginButton.vue';
import LogoFastDevelopment from '../components/Common/Icons/LogoFastDevelopment.vue'
import { useRouter } from '#vue-router';

const router = useRouter()

const login = () => router.push('/auth/login')

</script>