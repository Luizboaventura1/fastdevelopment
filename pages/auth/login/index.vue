<template>
  <TemplateAuth>
    <form class="py-5 px-9 bg-secondaryColorF w-full max-w-xl rounded-md">
      <h1 class="text-slate-50 text-2xl font-bold py-4 mb-4">
        Bem vindo(a)
      </h1>
      <InputEmail 
        typeInput="email"
        placeholderInput="Seu email"
        @valueInput="(val) => email = val"
        :error="emailInputError"
      />
      <InputPassword 
        placeholderInput="Sua senha"
        @valueInput="(val) => password = val"
        :error="passwordInputError"
      />
      <div class="my-3" />
      <SubmitButton
        :event="loginButton"
      >
        LOGIN
      </SubmitButton>
      <div class="mt-3"></div>
      <GoogleButton />
      <div class="text-center mt-4">
        <p
          class="text-white text-sm"
        >
          Não tem uma conta?
          <NuxtLink
            class="text-violet-500 hover:text-primaryColorF"
            to="/auth/register"
          >
            Fazer cadastro
          </NuxtLink>
        </p>
      </div>
    </form>
  </TemplateAuth>
</template>

<script setup>
import TemplateAuth from '../components/TemplateAuth.vue';
import InputEmail from '../components/InputEmail.vue';
import InputPassword from '../components/InputPassword.vue'
import SubmitButton from '../components/SubmitButton.vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../../firebase'
import GoogleButton from '../components/GoogleButton.vue';

let email = ref('')
let password = ref('')

const loginButton = () => {
  if (validateForm()) {
    signInWithEmailAndPassword(auth, email.value, password.value);
  }
}

let emailInputError = ref('')
let passwordInputError = ref('')

const validateForm = () => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const passwordRegex = /^\S+$/

  let stateValidade = ref(false)
  const generalState = ref({
    email: false,
    password: false
  })

  if (email.value === '') {
    emailInputError.value = 'Email obrigatório'
  } 

  else if (!emailRegex.test(email.value)) {
    emailInputError.value = 'Email inválido'
  }

  else if (email.value.length > 30) {
    emailInputError.value = 'Máximo de 30 caracteres'
  }

  else {
    generalState.value.email = true
  }

  // Validate Password

  if (password.value === '') {
    passwordInputError.value = 'Senha obrigatória'
  } 

  else if (password.value.length < 8) {
    passwordInputError.value = 'Mínimo de 8 caracteres'
  }

  else if (password.value.length > 30) {
    passwordInputError.value = 'Máximo de 30 caracteres'
  }

  else if (!passwordRegex.test(password.value)) {
    passwordInputError.value = 'Senha inválida'
  }

  else {
    generalState.value.password = true
  }

  if (generalState.value.email && generalState.value.password)
    return stateValidade.value = true
  else
    return stateValidade.value
}

useHead({
  title: 'Login'
})

</script>