<template>
  <div v-if="state" class="p-5">
    <div class="flex justify-center">
      <EmptyBoxIcon size="60" />
    </div>
    <PrimaryText class="text-sm text-center mt-5">
      <slot />
    </PrimaryText>
  </div>
</template>

<script setup>
import EmptyBoxIcon from "~/components/common/Icons/EmptyBoxIcon.vue";
import PrimaryText from "@/components/common/Text/PrimaryText";

defineProps({
  state: Boolean,
});
</script>
