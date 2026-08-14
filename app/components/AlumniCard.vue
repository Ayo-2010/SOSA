<template>
  <UCard class="bg-white text-gray-900 border border-gray-200">
    <div class="text-center mb-3 sm:mb-4">
      <UAvatar
        size="lg"
        :alt="name"
        class="mx-auto mb-2 bg-primary-100 text-primary-700"
      />
      <h3 class="font-bold text-sm sm:text-base md:text-lg text-gray-900">
        {{ name }}
      </h3>
      <UBadge
        color="primary"
        variant="subtle"
        size="xs"
        class="mt-1"
      >
        Class of {{ set }}
      </UBadge>
    </div>

    <div class="text-xs sm:text-sm md:text-base text-gray-600 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-briefcase"
          class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 shrink-0"
        />
        <span class="truncate">{{ profession }}</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 shrink-0"
        />
        <span class="truncate">{{ location }}</span>
      </div>
    </div>

    <template #footer>
      <UButton
        v-if="phone"
        block
        variant="solid"
        size="xs"
        color="success"
        :to="`https://wa.me/${phone}`"
        target="_blank"
        rel="noopener noreferrer"
        label="Connect"
        icon="i-heroicons-chat-bubble-left-right"
      />
      <UButton
        v-else
        block
        variant="outline"
        size="xs"
        label="Connect"
        disabled
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  set: string
  profession: string
  location: string
  phone?: string
}>()
</script>
