<script setup lang="ts">
import type { Event } from '~/data/events'

const props = defineProps<{
  event: Event
  featured?: boolean
}>()
</script>

<template>
  <UCard
    class="bg-white text-gray-900 border border-gray-200"
    :class="{ 'border-l-4 border-primary-500': props.featured }"
  >
    <template #header>
      <div class="flex justify-between items-start">
        <h3 class="text-xl font-bold text-gray-900">
          {{ event.title }}
        </h3>
        <UBadge
          color="primary"
          variant="subtle"
        >
          {{ event.date }}
        </UBadge>
      </div>
    </template>

    <p class="text-gray-600 mb-4">
      {{ event.description }}
    </p>

    <div class="space-y-2 text-sm text-gray-500 mb-6">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-clock"
          class="w-4 h-4 text-gray-400"
        />
        <span>{{ event.time }}</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-4 h-4 text-gray-400"
        />
        <span>{{ event.location }}</span>
      </div>
    </div>

    <template #footer>
      <UButton
        block
        label="Register for Event"
        color="primary"
      />
    </template>
  </UCard>
</template>
