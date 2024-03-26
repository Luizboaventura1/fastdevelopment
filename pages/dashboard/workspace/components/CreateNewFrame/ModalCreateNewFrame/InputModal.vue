<template>
  <input
    v-model="inputValue"
    @input="$emit('inputValue',inputValue)"
    name="nome"
    class="w-full border-0 outline-0 text-white rounded-lg bg-secondaryColorF p-3 ring-2 ring-transparent focus:ring-primaryColorF"
    type="text"
    :placeholder="props.placeholderInput"
    autocomplete="off"
  >
</template>

<script setup>
let props = defineProps({
  placeholderInput: String,
})

let inputValue = ref()

</script>

<style lang="scss" scoped>

::placeholder {
  color: #6b6b71;
}

</style>