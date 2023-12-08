<template>
  <input
    v-model="inputValue"
    @input="$emit('inputValue',inputValue)"
    name="nome"
    class="max-w-sm w-full border-0 outline-0 text-white bg-secondaryColorF placeholder-neutral-500"
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