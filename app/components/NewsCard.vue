<script setup lang="ts">
defineProps<{
  title: string
  date: string
  excerpt: string
}>()
</script>

<template>
  <UCard class="bg-white text-gray-900 border border-gray-200">
    <div class="flex justify-between items-start mb-2">
      <h4 class="font-bold text-lg text-gray-900">
        {{ title }}
      </h4>
      <span class="text-xs text-gray-400">{{ date }}</span>
    </div>
    <p class="text-gray-600 text-sm mb-4">
      {{ excerpt }}
    </p>
    <UButton
      variant="ghost"
      size="xs"
      label="Read More →"
    />
  </UCard>
</template>
