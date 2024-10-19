<template>
  <div class="bg-subSecondaryColorF text-center text-zinc-100 font-medium text-3xl">
    {{ greeting() }}, <slot />!
  </div>
</template>

<script setup>
const greeting = () => {
  let data = ref(new Date().getHours())
  
  if (data.value > 3 && data.value < 13) return 'Bom dia'
  else if (data.value > 12 && data.value < 19) return 'Boa tarde'
  else return 'Boa noite'
}
</script>

<style lang="scss" scoped>

</style>