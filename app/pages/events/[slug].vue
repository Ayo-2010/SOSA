<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div
        v-if="loading"
        class="text-gray-500 text-center py-8"
      >
        Loading event...
      </div>

      <div
        v-else-if="!event"
        class="text-center py-12"
      >
        <h1 class="text-2xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h1>
        <p class="text-gray-600 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <UButton
          to="/events"
          label="Back to Events"
          color="primary"
        />
      </div>

      <div v-else>
        <UButton
          to="/events"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          label="Back to Events"
          class="mb-6"
        />

        <article class="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <img
            v-if="event.banner_url"
            :src="event.banner_url"
            :alt="event.title"
            class="w-full h-64 sm:h-80 md:h-96 object-cover"
          >

          <div class="p-6 sm:p-8 md:p-10">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <UBadge
                :color="event.featured ? 'success' : 'neutral'"
                :label="event.featured ? 'Featured' : 'Standard'"
              />
              <span class="text-sm text-gray-400">
                {{ formatDate(event.event_date) }}
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {{ event.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
              <div class="flex items-center gap-1">
                <UIcon
                  name="i-heroicons-calendar"
                  class="w-4 h-4"
                />
                <span>{{ formatDate(event.event_date) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <UIcon
                  name="i-heroicons-clock"
                  class="w-4 h-4"
                />
                <span>{{ formatTime(event.event_date) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-4 h-4"
                />
                <span>{{ event.location }}</span>
              </div>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
              {{ event.description }}
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/database.types'
import { formatDate, formatTime } from '~/composables/useFormatters'

const route = useRoute()
const client = useSupabaseClient()
const event = ref<Event | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    const { data } = await client.from('events').select('*').eq('slug', slug).single()
    if (data) {
      event.value = data as Event
    }
  } catch {
    event.value = null
  } finally {
    loading.value = false
  }
})

useHead({
  title: computed(() => event.value ? `${event.value.title} — SOSA Network` : 'Event Not Found — SOSA Network'),
  meta: [
    { name: 'description', content: computed(() => event.value ? event.value.description.slice(0, 160) : 'The requested event could not be found.') },
    { property: 'og:title', content: computed(() => event.value?.title || 'Event Not Found') },
    { property: 'og:description', content: computed(() => event.value ? event.value.description.slice(0, 160) : 'The requested event could not be found.') }
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: `https://sosa-network.org/events/${route.params.slug}` }
  ]
})
</script>
