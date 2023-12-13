<template>
  <span
    v-if="state"
    class="text-red-500 text-sm"
  >
    {{ props.message }}
  </span>
</template>

<script setup>
let state = ref(false)

const props = defineProps({
  message: String
})

watchEffect(() => {
  if (props.message.length === 0) 
    state.value = false
  else 
    state.value = true
})
</script>