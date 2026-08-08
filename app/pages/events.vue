<script setup lang="ts">
import type { Event, AppEvent } from '~/types/database.types'

const client = useSupabaseClient()
const events = ref<AppEvent[]>([])
const loading = ref(true)

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

onMounted(async () => {
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
})

const upcomingEvents = computed(() => events.value.filter(e => !e.past))
const pastEvents = computed(() => events.value.filter(e => e.past))

useSeoMeta({
  title: 'Events — Startwell Old Student Association',
  description: 'View upcoming and past events, reunions, and programs by the Startwell Old Student Association.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Upcoming Events
        </h1>
        <p class="text-gray-600">
          Register for reunions, fundraisers, and chapter get-togethers.
        </p>
      </div>

      <div
        v-if="loading"
        class="text-gray-500"
      >
        Loading events...
      </div>
      <div
        v-else-if="!upcomingEvents.length"
        class="text-gray-500"
      >
        No upcoming events.
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        <EventCard
          v-for="event in upcomingEvents"
          :key="event.id"
          :event="event"
          :featured="event.featured"
        />
      </div>

      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Past Events
        </h2>
        <p class="text-gray-600">
          Relive the memories from our previous gatherings and programs.
        </p>
      </div>

      <div
        v-if="loading"
        class="text-gray-500"
      >
        Loading events...
      </div>
      <div
        v-else-if="!pastEvents.length"
        class="text-gray-500"
      >
        No past events.
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <EventCard
          v-for="event in pastEvents"
          :key="event.id"
          :event="event"
          :featured="event.featured"
        />
      </div>
    </UContainer>
  </div>
</template>
