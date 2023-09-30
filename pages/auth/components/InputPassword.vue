<template>
  <div class="input-group w-full">
    <div
      @click="labelInput"
      tabindex="0"
      class="label-input cursor-text flex rounded-md items-center justify-between bg-subSecondaryColorF px-3 py-3"
    >
      <div class="icon pe-3">
        <svg class="w-[18px] h-[18px] fill-secondaryColorF" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M405.333 179.712v-30.379C405.333 66.859 338.475 0 256 0S106.667 66.859 106.667 149.333v30.379c-38.826 16.945-63.944 55.259-64 97.621v128C42.737 464.214 90.452 511.93 149.333 512h213.333c58.881-.07 106.596-47.786 106.667-106.667v-128c-.055-42.362-25.174-80.676-64-97.621zm-128 182.955c0 11.782-9.551 21.333-21.333 21.333-11.782 0-21.333-9.551-21.333-21.333V320c0-11.782 9.551-21.333 21.333-21.333 11.782 0 21.333 9.551 21.333 21.333v42.667zm85.334-192H149.333v-21.333c0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667v21.333z" opacity="1" data-original="#000000"></path></g></svg>
      </div>
      <input
        v-model="inputValue"
        @input="$emit('valueInput',inputValue)"
        name="nome"
        class="input-password w-full border-0 outline-0 text-white bg-subSecondaryColorF"
        :type="typeInput"
        :placeholder="props.placeholderInput"
      >
      <div class="ms-3">
        <svg
          @click="eyeButton"
          v-if="stateEye"
          class="w-[18px] h-[18px] fill-primaryColorF opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M23.821 11.181a15.736 15.736 0 0 0-4.145-5.44l3.032-3.032-1.415-1.416L18 4.583A11.783 11.783 0 0 0 12 3C4.5 3 1.057 9.261.179 11.181a1.969 1.969 0 0 0 0 1.64 15.736 15.736 0 0 0 4.145 5.44l-3.031 3.032 1.414 1.414L6 19.417A11.783 11.783 0 0 0 12 21c7.5 0 10.943-6.261 11.821-8.181a1.968 1.968 0 0 0 0-1.638ZM6 12a5.99 5.99 0 0 1 9.471-4.885l-1.452 1.452A3.947 3.947 0 0 0 12 8a4 4 0 0 0-4 4 3.947 3.947 0 0 0 .567 2.019l-1.452 1.452A5.961 5.961 0 0 1 6 12Zm6 6a5.961 5.961 0 0 1-3.471-1.115l1.452-1.452A3.947 3.947 0 0 0 12 16a4 4 0 0 0 4-4 3.947 3.947 0 0 0-.567-2.019l1.452-1.452A5.99 5.99 0 0 1 12 18Z" opacity="1" data-original="#000000"></path></g></svg>
        <svg
          @click="eyeButton"
          v-if="!stateEye"
          class="w-[18px] h-[18px] fill-primaryColorF cursor-pointer" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M23.821 11.181C22.943 9.261 19.5 3 12 3S1.057 9.261.179 11.181a1.969 1.969 0 0 0 0 1.64C1.057 14.739 4.5 21 12 21s10.943-6.261 11.821-8.181a1.968 1.968 0 0 0 0-1.638ZM12 18a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6Z" opacity="1" data-original="#000000" class=""></path><circle cx="12" cy="12" r="4" opacity="1" data-original="#000000"></circle></g></svg>
      </div>
    </div>
    <div class="errors h-[20px] flex items-start">
      <span class="text-red-500 text-sm">
        {{ props.error }}
      </span>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  placeholderInput: String,
  error: String
})

let stateEye = ref(false)
let typeInput = ref('password')

const eyeButton = () => {
  stateEye.value = !stateEye.value
  if (stateEye.value)
    return typeInput.value = 'text'
  else
    return typeInput.value = 'password'
}

let inputValue = ref()

const labelInput = () => {
  document.querySelector('.input-password').focus()
}
</script>

<style lang="scss" scoped>

::placeholder {
  color: #4f4f55;
}

.label-input {
  transition: .1s;
}

svg {
  transition: .1s;
}

.label-input:focus-within svg {
  fill: #8257e5;
}

.label-input:focus-within {
  outline: 2px solid #8257e5;
}

</style>