<template>
  <NuxtLink
    v-if="link"
    :to="link"
    class="block no-underline"
  >
    <UCard
      class="bg-white text-gray-900 border border-gray-200 hover:shadow-md transition-shadow"
      :class="{ 'border-l-4 border-primary-500': featured }"
    >
      <template #header>
        <div class="flex flex-wrap justify-between items-start gap-2">
          <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900">
            {{ event.title }}
          </h3>
          <UBadge
            color="primary"
            variant="subtle"
            class="shrink-0"
          >
            {{ event.date }}
          </UBadge>
        </div>
      </template>

      <p class="text-gray-600 mb-4 text-sm sm:text-base">
        {{ truncate(event.description, 20) }}
      </p>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <div class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-calendar"
            class="w-4 h-4"
          />
          <span>{{ event.date }}</span>
        </div>
        <div class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-map-pin"
            class="w-4 h-4"
          />
          <span>{{ event.location }}</span>
        </div>
      </div>
    </UCard>
  </NuxtLink>
  <UCard
    v-else
    class="bg-white text-gray-900 border border-gray-200"
    :class="{ 'border-l-4 border-primary-500': featured }"
  >
    <template #header>
      <div class="flex flex-wrap justify-between items-start gap-2">
        <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900">
          {{ event.title }}
        </h3>
        <UBadge
          color="primary"
          variant="subtle"
          class="shrink-0"
        >
          {{ event.date }}
        </UBadge>
      </div>
    </template>

    <p class="text-gray-600 mb-4 text-sm sm:text-base">
      {{ truncate(event.description, 20) }}
    </p>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
      <div class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-calendar"
          class="w-4 h-4"
        />
        <span>{{ event.date }}</span>
      </div>
      <div class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-4 h-4"
        />
        <span>{{ event.location }}</span>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { AppEvent } from '~/types/database.types'
import { truncate } from '~/utils/truncate'

defineProps<{
  event: AppEvent
  featured?: boolean
  link?: string
}>()
</script>
