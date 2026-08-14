<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div
        v-if="loading"
        class="text-gray-500 text-center py-8"
      >
        Loading post...
      </div>

      <div
        v-else-if="!post"
        class="text-center py-12"
      >
        <h1 class="text-2xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h1>
        <p class="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <UButton
          to="/blog"
          label="Back to Blog"
          color="primary"
        />
      </div>

      <div v-else>
        <UButton
          to="/blog"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          label="Back to Blog"
          class="mb-6"
        />

        <article class="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <img
            v-if="post.image_url"
            :src="post.image_url"
            :alt="post.title"
            class="w-full h-64 sm:h-80 md:h-96 object-cover"
          >

          <div class="p-6 sm:p-8 md:p-10">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <UBadge
                color="primary"
                variant="subtle"
                size="sm"
              >
                {{ post.category }}
              </UBadge>
              <span class="text-sm text-gray-400">
                {{ formatDate(post.created_at) }}
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <UIcon
                name="i-heroicons-user"
                class="w-4 h-4"
              />
              <span>{{ post.author || 'SOSA Communications' }}</span>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
              {{ post.content }}
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/database.types'
import { formatDate } from '~/composables/useFormatters'

const route = useRoute()
const client = useSupabaseClient()
const post = ref<Post | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    const { data } = await client.from('posts').select('*').eq('slug', slug).single()
    if (data) {
      post.value = data as Post
    }
  } catch {
    post.value = null
  } finally {
    loading.value = false
  }
})

useHead({
  title: computed(() => post.value ? `${post.value.title} — SOSA Network` : 'Post Not Found — SOSA Network'),
  meta: [
    { name: 'description', content: computed(() => post.value ? post.value.content.slice(0, 160) : 'The requested post could not be found.') },
    { property: 'og:title', content: computed(() => post.value?.title || 'Post Not Found') },
    { property: 'og:description', content: computed(() => post.value ? post.value.content.slice(0, 160) : 'The requested post could not be found.') }
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: `https://sosa-network.org/blog/${route.params.slug}` }
  ]
})
</script>
