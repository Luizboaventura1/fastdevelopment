<template>
  <button
    @click="$emit('button')"
    class="`
    text-white font-medium
     text-sm px-4 py-2 transition-colors
     duration-300
     bg-primaryColorF rounded
     hover:bg-primaryColorFHover
     `"
  >
    <slot />
  </button>
</template>
