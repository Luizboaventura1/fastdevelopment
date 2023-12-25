<template>
  <input
    v-model="inputValue"
    @input="$emit('inputValue', inputValue)"
    name="nome"
    class="w-full border-0 p-4 rounded-2xl outline-0 h-[30px] text-white bg-secondaryColorF text-sm"
    type="text"
    :placeholder="props.placeholderInput"
    autocomplete="off"
  />
</template>

<script setup>
let props = defineProps({
  placeholderInput: String,
});

let inputValue = ref();
</script>
