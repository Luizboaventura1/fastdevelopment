<template>
  <div
    :style="`width: ${props.size ? props.size : '20'}px;height: ${
      props.size ? props.size : '20'
    }px;`"
    class="border-thirdBorderF cursor-pointer flex justify-center items-center"
    :class="`${props.checked ? 'border-0' : 'border-2'}`"
  >
    <div
      v-if="props.checked"
      class="flex justify-center p-1 items-center w-full h-full bg-primaryColorF"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 405.272 405.272"
        style="enable-background: new 0 0 512 512"
        xml:space="preserve"
        class="w-full h-full fill-secondaryColorF"
      >
        <g>
          <path
            d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: String,
  checked: Boolean,
});
</script>
