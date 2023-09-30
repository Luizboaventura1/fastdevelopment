<template>
  <div class="input-group w-full">
    <div
      @click="labelInput"
      tabindex="0"
      class="label-input cursor-text flex rounded-md items-center justify-between bg-subSecondaryColorF px-3 py-3"
    >
      <div class="icon pe-3">
        <svg class="w-[18px] h-[18px] fill-secondaryColorF" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><circle cx="256" cy="128" r="128" opacity="1" data-original="#000000"></circle><path d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z" opacity="1" data-original="#000000"></path></g></svg>     
      </div>
      <input
        v-model="inputValue"
        @input="$emit('valueInput',inputValue)"
        name="nome"
        class="input-name w-full border-0 outline-0 text-white bg-subSecondaryColorF"
        type="name"
        :placeholder="props.placeholderInput"
      >
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
  error: String,
})

let inputValue = ref()

const labelInput = () => {
  document.querySelector('.input-name').focus()
}

</script>

<style lang="scss" scoped>

::placeholder {
  color: #4f4f55;
}

.label-input {
  transition: .1s;
}

.label-input:focus-within svg {
  fill: #8257e5;
}

.label-input:focus-within {
  outline: 2px solid #8257e5;
}

</style>