<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Blog & Updates
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          In-depth stories, program updates, and alumni spotlights from our community.
        </p>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <SkeletonCard
          v-for="n in 6"
          :key="n"
          image
        />
      </div>

      <div
        v-else-if="posts.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <div
          v-for="post in posts"
          :key="post.id"
          class="group"
        >
          <UCard class="bg-white text-gray-900 border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
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
                :to="`/blog/${post.slug}`"
                class="no-underline"
              >
                <h3 class="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ post.title }}
                </h3>
              </NuxtLink>
            </template>

            <p class="text-gray-600 text-sm mb-4 flex-1">
              {{ truncate(post.content, 20) }}
            </p>

            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-lg mb-4"
            >

            <div class="flex items-center justify-between gap-2 mt-auto">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <UIcon
                  name="i-heroicons-user"
                  class="w-3 h-3"
                />
                <span>{{ post.author || 'SOSA Communications' }}</span>
              </div>
              <UButton
                variant="link"
                :to="`/blog/${post.slug}`"
                label="Read More"
                icon="i-heroicons-arrow-right"
              />
            </div>
          </UCard>
        </div>
      </div>
      <UEmpty
        v-else
        description="No posts found."
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
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await client.from('posts').select('*').eq('category', 'Blog').order('created_at', { ascending: false })
    if (data) {
      posts.value = data as Post[]
    }
    loading.value = false
  } catch {
    loading.value = false
  }
})

useSeoMeta({
  title: 'Blog & Updates — SOSA',
  description: 'In-depth stories, program updates, and alumni spotlights from the Startwell Old Student Association community.',
  ogTitle: 'Blog & Updates — SOSA',
  ogDescription: 'In-depth stories, program updates, and alumni spotlights from the SOSA community.'
})
</script>
