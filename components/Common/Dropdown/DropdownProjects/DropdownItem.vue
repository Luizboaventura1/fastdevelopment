<template>
  <nuxt-link :to="props.link">
    <li class="flex items-center whitespace-nowrap text-sm cursor-pointer text-textPrimaryColorF font-medium h-[36px] hover:bg-thirdColorF rounded-lg duration-300 transition-colors p-2">
      <span class="truncate">
        <slot />
      </span>
    </li>
  </nuxt-link>
</template>

<script setup> 
const props = defineProps({
  link: String
})
</script>