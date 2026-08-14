<template>
  <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    <div class="animate-pulse">
      <div
        v-if="image"
        class="w-full h-48 bg-gray-200"
      />
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="h-5 bg-gray-200 rounded w-20" />
          <div class="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div class="h-6 bg-gray-200 rounded mb-3" />
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded" />
          <div class="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div class="h-4 bg-gray-200 rounded w-24" />
          <div class="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: boolean
}>()
</script>
