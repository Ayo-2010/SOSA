<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          News & Updates
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          Stay informed with the latest school milestones, alumni achievements, and association updates.
        </p>
      </div>

      <div class="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        <UButton
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'outline'"
          :color="selectedCategory === category ? 'primary' : 'neutral'"
          :label="category"
          @click="selectedCategory = category"
        />
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 gap-6"
      >
        <SkeletonCard
          v-for="n in 3"
          :key="n"
          image
        />
      </div>

      <div
        v-else-if="filteredPosts.length"
        class="space-y-6"
      >
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="group"
        >
          <UCard class="bg-white text-gray-900 border border-gray-200 hover:shadow-md transition-shadow">
            <template #header>
              <div class="flex items-center justify-between mb-2">
                <UBadge
                  color="primary"
                  variant="subtle"
                  size="xs"
                >
                  {{ post.category }}
                </UBadge>
                <span class="text-xs text-gray-400">{{ formatDate(post.created_at) }}</span>
              </div>
              <NuxtLink
                :to="`/news/${post.slug}`"
                class="no-underline"
              >
                <h3 class="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ post.title }}
                </h3>
              </NuxtLink>
            </template>

            <p class="text-gray-600 mb-4">
              {{ truncate(post.content, 20) }}
            </p>

            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-lg mb-4"
            >

            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <UIcon
                  name="i-heroicons-user"
                  class="w-3 h-3"
                />
                <span>{{ post.author || 'SOSA Communications' }}</span>
              </div>
              <UButton
                variant="link"
                :to="`/news/${post.slug}`"
                label="Read More"
                icon="i-heroicons-arrow-right"
              />
            </div>
          </UCard>
        </div>
      </div>
      <UEmpty
        v-else
        description="No posts found in this category."
      />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/database.types'
import { formatDate } from '~/composables/useFormatters'
import { truncate } from '~/utils/truncate'
import SkeletonCard from '~/components/SkeletonCard.vue'

const client = useSupabaseClient()
const posts = ref<Post[]>([])
const selectedCategory = ref('All')
const loading = ref(true)

const categories = ['All', 'News', 'School Milestone', 'Program Update', 'Alumni Spotlight']

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') return posts.value
  return posts.value.filter(post => post.category === selectedCategory.value)
})

onMounted(async () => {
  try {
    const { data } = await client.from('posts').select('*').eq('category', 'News').order('created_at', { ascending: false })
    if (data) {
      posts.value = data as Post[]
    }
    loading.value = false
  } catch {
    loading.value = false
  }
})

useSeoMeta({
  title: 'News & Updates — SOSA',
  description: 'Latest news and announcements from the Startwell Old Student Association.',
  ogTitle: 'News & Updates — SOSA',
  ogDescription: 'Latest news and announcements from the Startwell Old Student Association.'
})
</script>
