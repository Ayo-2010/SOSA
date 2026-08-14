<template>
  <div class="bg-white text-gray-900 border-b border-gray-200 py-10 sm:py-12 md:py-16">
    <UContainer>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
        <div
          v-for="stat in props.stats"
          :key="stat.label"
        >
          <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 sm:mb-2 text-primary-700">
            {{ stat.value }}
          </div>
          <div class="text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stats: { label: string, value: string }[]
}>()
</script>
