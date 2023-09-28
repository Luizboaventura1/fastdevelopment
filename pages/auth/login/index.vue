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

let email = ref('')
let password = ref('')

const loginButton = () => {
  if (validadeForm()) {
    console.log('logado!')
  }
}

let emailInputError = ref('')
let passwordInputError = ref('')

const validadeForm = () => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const passwordRegex = /^\S+$/

  let stateValidade = ref(true)

  // Validate Email

  if (email.value === '') {
    emailInputError.value = 'Email obrigatório'
    stateValidade.value = false
  } 

  else if (!emailRegex.test(email.value)) {
    emailInputError.value = 'Email inválido'
    stateValidade.value = false
  }

  else if (email.value.length > 30) {
    emailInputError.value = 'Máximo de 30 caracteres'
    stateValidade.value = false
  }

  else {
    stateValidade.value = true
  }

  // Validate Password

  if (password.value === '') {
    passwordInputError.value = 'Senha obrigatória'
    stateValidade.value = false
  } 

  else if (password.value.length < 8) {
    passwordInputError.value = 'Mínimo de 8 caracteres'
    stateValidade.value = false
  }

  else if (password.value.length > 30) {
    passwordInputError.value = 'Máximo de 30 caracteres'
    stateValidade.value = false
  }

  else if (!passwordRegex.test(password.value)) {
    passwordInputError.value = 'Senha inválida'
    stateValidade.value = false
  }

  else {
    stateValidade.value = true
  }

  return stateValidade.value
}

</script>