<template>
  <TemplateAuth>
    <form class="py-5 px-9 bg-secondaryColorF w-full max-w-xl rounded-md">
      <h1 class="text-slate-50 text-2xl font-bold py-4 mb-4">
        Criar conta
      </h1>
      <InputName 
        placeholderInput="Seu nome"
        @valueInput="(val) => name = val"
        :error="inputNameError"
      />
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
        :event="registerButton"
      >
        CADASTRAR
      </SubmitButton>
      <div class="mt-3"></div>
      <GoogleButton />
      <div class="text-center mt-4">
        <p
          class="text-white text-sm"
        >
          Tem uma conta?
          <NuxtLink
            class="text-violet-500 hover:text-primaryColorF"
            to="/auth/login"
          >
            Fazer login
          </NuxtLink>
        </p>
      </div>
    </form>
  </TemplateAuth>
  <ErrorMessage
    :popup="statePopup"
   />
</template>

<script setup>
import TemplateAuth from '../components/TemplateAuth.vue';
import InputEmail from '../components/InputEmail.vue';
import InputPassword from '../components/InputPassword.vue'
import InputName from '../components/InputName.vue';
import SubmitButton from '../components/SubmitButton.vue';
import { createUser } from '../../../utils/firebaseUtils.js';
import ErrorMessage from '../components/Popups/ErrorMessage.vue';
import GoogleButton from '../components/GoogleButton.vue';

let name = ref('')
let email = ref('')
let password = ref('')

const registerButton = () => {
  if (validateForm() === true) {
    //createUser(name.value,email.value,password.value)
    console.log('q9euibf')
  } else {
    ErrorMessagePopup()
  }
}


let inputNameError = ref('')
let emailInputError = ref('')
let passwordInputError = ref('')

const validateForm = () => {
  const nameRegex = /^[A-Za-z\s]+$/
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const passwordRegex = /^\S+$/

  let stateValidade = ref(false)
  const generalState = ref({
    name: false,
    email: false,
    password: false
  })

  // Validate Name

  if (name.value.trim() === '') {
    inputNameError.value = 'Nome obrigatório'
  } 

  else if (name.value.length < 3) {
    inputNameError.value = 'Mínimo de 3 caracteres'
  }

  else if (name.value.length > 20) {
    inputNameError.value = 'Máximo de 20 caracteres'
  }

  else if (!nameRegex.test(name.value)) {
    inputNameError.value = 'Nome inválido'
  }

  else {
    generalState.value.name = true
  }

  // Validate Email

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

  if (generalState.value.name && generalState.value.email && generalState.value.password)
    return stateValidade.value = true
  else
    return stateValidade.value
}

useHead({
  title: 'Criar conta'
})

let statePopup = ref(false)
const ErrorMessagePopup = () => {
  statePopup.value = true
  setTimeout(() => statePopup.value = false,2000)
}
</script>