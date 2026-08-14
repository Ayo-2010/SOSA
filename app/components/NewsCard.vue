<template>
  <UCard class="bg-white text-gray-900 border border-gray-200">
    <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
      <h4 class="font-bold text-sm sm:text-base md:text-lg text-gray-900">
        {{ title }}
      </h4>
      <span class="text-xs text-gray-400 shrink-0">{{ date }}</span>
    </div>
    <p class="text-gray-600 text-sm mb-4">
      {{ excerpt }}
    </p>
    <UButton
      v-if="link"
      variant="ghost"
      size="xs"
      label="Read More →"
      :to="link"
    />
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  date: string
  excerpt: string
  link?: string
}>()
</script>
