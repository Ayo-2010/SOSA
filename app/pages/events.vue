<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Upcoming Events
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          Register for reunions, fundraisers, and chapter get-togethers.
        </p>
      </div>

      <div
        v-if="loading"
        class="text-gray-500 text-center py-8"
      >
        Loading events...
      </div>
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
      >
        <SkeletonCard
          v-for="n in 2"
          :key="'upcoming-'+n"
          image
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
      >
        <EventCard
          v-for="event in upcomingEvents"
          :key="event.id"
          :event="event"
          :featured="event.featured"
          :link="`/events/${event.slug}`"
        />
      </div>

      <div class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Past Events
        </h2>
        <p class="text-gray-600 text-sm sm:text-base">
          Relive the memories from our previous gatherings and programs.
        </p>
      </div>

      <div
        v-if="loading"
        class="text-gray-500 text-center py-8"
      >
        Loading events...
      </div>
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        <SkeletonCard
          v-for="n in 2"
          :key="'past-'+n"
          image
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        <EventCard
          v-for="event in pastEvents"
          :key="event.id"
          :event="event"
          :featured="event.featured"
          :link="`/events/${event.slug}`"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Event, AppEvent } from '~/types/database.types'
import { formatDate, formatTime } from '~/composables/useFormatters'
import SkeletonCard from '~/components/SkeletonCard.vue'

const client = useSupabaseClient()
const events = ref<AppEvent[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await client.from('events').select('*').order('event_date', { ascending: true })
    if (data) {
      events.value = data.map((e: Event) => ({
        ...e,
        date: formatDate(e.event_date),
        time: formatTime(e.event_date),
        featured: e.featured || false,
        past: new Date(e.event_date) < new Date()
      }))
    }
    loading.value = false
  } catch {
    loading.value = false
  }
})

const upcomingEvents = computed(() => events.value.filter(e => !e.past))
const pastEvents = computed(() => events.value.filter(e => e.past))

useSeoMeta({
  title: 'Events — Startwell Old Student Association',
  description: 'View upcoming and past events, reunions, and programs by the Startwell Old Student Association.',
  ogTitle: 'Events — SOSA Network',
  ogDescription: 'View upcoming reunions, fundraisers, and chapter get-togethers.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/events' }
  ]
})
</script>
