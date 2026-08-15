<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-4xl">
      <div class="text-center mb-16">
        <UBadge
          color="primary"
          variant="subtle"
          label="Our Heritage"
          class="mb-3"
        />
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          History of Our Great Institution
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Take a walk down memory lane and explore the key milestones, achievements, and evolution of our beloved school from inception to the present day.
        </p>
      </div>

      <div
        v-if="loading"
        class="relative border-l-2 border-primary-200 ml-4 md:ml-32 space-y-12"
      >
        <div
          v-for="n in 3"
          :key="n"
          class="relative pl-8 md:pl-12"
        >
          <div
            class="absolute -left-[17px] top-0 bg-gray-300 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
          >
            <UIcon
              name="i-heroicons-document-text"
              class="w-4 h-4"
            />
          </div>
          <div class="md:absolute md:-left-32 md:top-0 md:text-right md:w-24">
            <span class="inline-block bg-gray-200 text-gray-600 font-bold text-sm px-3 py-1 rounded-full mb-2 md:mb-0">
              Year
            </span>
          </div>
          <UCard class="border border-gray-100 bg-white">
            <div class="animate-pulse">
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div class="h-4 bg-gray-200 rounded w-full mb-2" />
              <div class="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </UCard>
        </div>
      </div>

      <div
        v-else-if="!historyItems.length"
        class="text-center text-gray-500 py-10"
      >
        No history items yet.
      </div>

      <div
        v-else
        class="relative border-l-2 border-primary-200 ml-4 md:ml-32 space-y-12"
      >
        <div
          v-for="item in historyItems"
          :key="item.id"
          class="relative pl-8 md:pl-12"
        >
          <div class="absolute -left-[17px] top-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
            <UIcon
              name="i-heroicons-document-text"
              class="w-4 h-4"
            />
          </div>

          <div class="md:absolute md:-left-32 md:top-0 md:text-right md:w-24">
            <span class="inline-block bg-primary-100 text-primary-800 font-bold text-sm px-3 py-1 rounded-full mb-2 md:mb-0">
              {{ getYear(item.event_date) }}
            </span>
          </div>

          <UCard class="transition-all duration-300 hover:shadow-lg border border-gray-100 bg-white">
            <img
              v-if="item.image_url"
              :src="item.image_url"
              :alt="item.title"
              class="w-full h-48 sm:h-64 object-cover rounded-t-xl mb-4"
            >
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ item.content }}
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { HistoryItem } from '~/types/database.types'

const client = useSupabaseClient()
const historyItems = ref<HistoryItem[]>([])
const loading = ref(true)

const getYear = (dateStr: string | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).getFullYear().toString()
}

onMounted(async () => {
  try {
    const { data } = await client.from('history').select('*').order('event_date', { ascending: false })
    if (data) {
      historyItems.value = data as HistoryItem[]
    }
  } catch {
    historyItems.value = []
  } finally {
    loading.value = false
  }
})

useSeoMeta({
  title: 'History — SOSA',
  description: 'Explore the history and milestones of the Startwell Old Student Association.',
  ogTitle: 'History — SOSA',
  ogDescription: 'Explore the history and milestones of SOSA.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/history' }
  ]
})
</script>
