<script setup lang="ts">
defineProps<{
  name: string
  set: string
  profession: string
  location: string
}>()
</script>

<template>
  <UCard class="bg-white text-gray-900 border border-gray-200">
    <div class="text-center mb-4">
      <UAvatar
        size="lg"
        :alt="name"
        class="mx-auto mb-2 bg-primary-100 text-primary-700"
      />
      <h3 class="font-bold text-lg text-gray-900">
        {{ name }}
      </h3>
      <UBadge
        color="primary"
        variant="subtle"
        size="xs"
      >
        Class of {{ set }}
      </UBadge>
    </div>

    <div class="text-sm text-gray-600 space-y-1 mb-4">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-briefcase"
          class="w-4 h-4 text-gray-400"
        />
        <span>{{ profession }}</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-4 h-4 text-gray-400"
        />
        <span>{{ location }}</span>
      </div>
    </div>

    <template #footer>
      <UButton
        block
        variant="outline"
        size="xs"
        label="Connect"
      />
    </template>
  </UCard>
</template>
