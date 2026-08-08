<script setup lang="ts">
const props = defineProps<{
  links: { label: string, to: string }[]
}>()
</script>

<template>
  <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
    <UContainer class="flex items-center justify-between h-16">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-bold text-xl text-primary-600"
      >
        <UIcon
          name="i-heroicons-academic-cap"
          class="w-8 h-8"
        />
        <span>SOSA Network</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="link in props.links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <slot name="actions" />
        <UButton
          label="Member Login"
          variant="outline"
          size="sm"
          to="/login"
        />
      </div>
    </UContainer>
  </header>
</template>
