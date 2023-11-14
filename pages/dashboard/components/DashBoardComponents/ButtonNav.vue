<template>
  <button
    @click.stop="$emit('event')"
    class="rounded-full transition-colors hover:bg-zinc-800 p-2"
  >
    <slot />
  </button>
</template>