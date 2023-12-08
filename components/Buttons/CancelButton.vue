<template>
  <button
    @click="$emit('button')"
    class="`
    text-white font-medium
     text-sm px-4 py-2 transition-colors
     bg-zinc-700 rounded
     hover:bg-red-500
     `"
  >
    <slot />
  </button>
</template>
