<template>
  <div class="input-group w-full">
    <div
      @click="labelInput"
      tabindex="0"
      class="label-input cursor-text flex rounded-md items-center justify-between bg-subSecondaryColorF px-3 py-3"
    >
      <div class="icon pe-3">
        <svg class="w-[18px] h-[18px] fill-secondaryColorF" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="m23.954 5.542-8.418 8.418a5.007 5.007 0 0 1-7.072 0L.046 5.542C.032 5.7 0 5.843 0 6v12a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V6c0-.157-.032-.3-.046-.458Z" opacity="1" data-original="#000000" class=""></path><path d="m14.122 12.546 9.134-9.135A4.986 4.986 0 0 0 19 1H5A4.986 4.986 0 0 0 .744 3.411l9.134 9.135a3.007 3.007 0 0 0 4.244 0Z" opacity="1" data-original="#000000" class=""></path></g></svg>
      </div>
      <input
        v-model="inputValue"
        @input="$emit('valueInput',inputValue)"
        name="nome"
        class="input-email w-full border-0 outline-0 text-white bg-subSecondaryColorF"
        :type="props.typeInput"
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
  typeInput: String,
  placeholderInput: String,
  error: String
})

let inputValue = ref()

const labelInput = () => {
  document.querySelector('.input-email').focus()
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