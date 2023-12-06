<template>
  <div
    v-if="props.state"
    class="w-[280px] h-[55px] bg-secondaryColorF rounded overflow-hidden absolute top-5 right-5"
  >
    <div class="flex items-center p-4 gap-4 h-[52px]">
      <div>
        <Error size="18" />
      </div>
      <div class="text-red-500">
        {{ props.message }}
      </div>
    </div>
    <div class="w-100 h-[3px] bg-zinc-600">
      <div class="bar h-[3px] bg-red-600"></div>
    </div>
  </div>
</template>

<script setup>
import Error from "@/components/Common/Icons/Error.vue";

let props = defineProps({
  message: String,
  state: Boolean,
});
</script>

<style lang="scss" scoped>
.bar {
  animation: bar 3s ease-in-out;
  width: 0;
}

@keyframes bar {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
</style>
