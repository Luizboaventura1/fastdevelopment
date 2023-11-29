<template>
  <input
    v-model="inputValue"
    @input="$emit('inputValue',inputValue)"
    name="nome"
    class="max-w-sm w-full border-0 outline-0 text-white bg-secondaryColorF"
    type="search"
    :placeholder="props.placeholderInput"
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