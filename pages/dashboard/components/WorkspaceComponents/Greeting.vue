<template>
  <div class="bg-subSecondaryColorF px-2 py-5 text-center text-white font-medium text-3xl">
    {{ greeting() }}, {{ props.name }}
  </div>
</template>

<script setup>
const greeting = () => {
  let data = ref(new Date().getHours())
  
  if (data.value > 3 && data.value < 13) return 'Bom dia'
  else if (data.value > 12 && data.value < 19) return 'Boa tarde'
  else return 'Boa noite'
}

let props = defineProps({
  name: String
})
</script>

<style lang="scss" scoped>

</style>