<template>
  <div class="w-full bg-subSecondaryColorF ring-1 rounded-lg shadow shadow-black ring-thirdColorF p-3">
    <nav class="mb-3">
      <SecondaryText sm>
        Selecione uma cor
      </SecondaryText>
    </nav>
    <main class="max-h-[200px] overflow-y-auto p-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import SecondaryText from "@/components/Common/Text/SecondaryText"
</script>