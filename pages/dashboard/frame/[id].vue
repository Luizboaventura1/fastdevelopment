<template>
  <div class="w-full min-w-max h-full">
    <Kanban />
    <SpeedInsights />
  </div>
</template>

<script setup>
import Kanban from '@/components/Features/frame/Kanban/index.vue'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>