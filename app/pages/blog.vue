<script setup lang="ts">
import { blogPosts, blogCategories } from '~/data/blog'

const selectedCategory = ref('All')

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') return blogPosts
  return blogPosts.filter(post => post.category === selectedCategory.value)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: 'News & Updates — SOSA Network',
  description: 'Stay informed with the latest school milestones, alumni achievements, and association updates.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          News & Updates
        </h1>
        <p class="text-gray-600">
          Stay informed with the latest school milestones, alumni achievements, and association updates.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 mb-8">
        <UButton
          v-for="category in blogCategories"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'outline'"
          :color="selectedCategory === category ? 'primary' : 'neutral'"
          :label="category"
          @click="selectedCategory = category"
        />
      </div>

      <div
        v-if="filteredPosts.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <UCard
          v-for="post in filteredPosts"
          :key="post.id"
          class="bg-white text-gray-900 border border-gray-200"
        >
          <template #header>
            <div class="flex items-center justify-between mb-2">
              <UBadge
                color="primary"
                variant="subtle"
                size="xs"
              >
                {{ post.category }}
              </UBadge>
              <span class="text-xs text-gray-400">{{ formatDate(post.date) }}</span>
            </div>
            <h3 class="font-bold text-lg text-gray-900">
              {{ post.title }}
            </h3>
          </template>

          <p class="text-gray-600 text-sm mb-4">
            {{ post.excerpt }}
          </p>

          <div class="flex items-center gap-2 text-xs text-gray-500">
            <UIcon
              name="i-heroicons-user"
              class="w-3 h-3"
            />
            <span>{{ post.author }}</span>
          </div>

          <template #footer>
            <UButton
              block
              variant="ghost"
              size="xs"
              label="Read More →"
            />
          </template>
        </UCard>
      </div>
      <UEmpty
        v-else
        description="No posts found in this category."
      />
    </UContainer>
  </div>
</template>
