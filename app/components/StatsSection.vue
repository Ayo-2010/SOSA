<script setup lang="ts">
const props = defineProps<{
  stats: { label: string, value: string }[]
}>()
</script>

<template>
  <div class="bg-white text-gray-900 border-b border-gray-200 py-12">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div
          v-for="stat in props.stats"
          :key="stat.label"
        >
          <div class="text-4xl font-extrabold mb-2 text-primary-700">
            {{ stat.value }}
          </div>
          <div class="text-gray-600 text-sm uppercase tracking-wider">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
