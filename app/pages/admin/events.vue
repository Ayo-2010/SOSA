<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
    >
      <SkeletonCard
        v-for="n in 4"
        :key="n"
        image
      />
    </div>

    <div
      v-else-if="!user"
      class="py-10"
    >
      <UCard class="bg-white text-gray-900 border border-gray-200 p-8 shadow-sm text-center">
        <UBadge
          color="error"
          variant="subtle"
          label="Restricted Access"
          class="mb-4"
        />
        <h1 class="text-3xl font-extrabold text-gray-900 mb-4">
          Admin Events
        </h1>
        <p class="text-gray-600 mb-6">
          Please log in to continue.
        </p>
        <UButton
          to="/login"
          label="Member Login"
          color="primary"
        />
      </UCard>
    </div>

    <div
      v-else-if="!isAdmin"
      class="py-10"
    >
      <UCard class="bg-white text-gray-900 border border-gray-200 p-8 shadow-sm text-center">
        <UBadge
          color="error"
          variant="subtle"
          label="Access Denied"
          class="mb-4"
        />
        <h1 class="text-3xl font-extrabold text-gray-900 mb-4">
          Not Authorized
        </h1>
        <p class="text-gray-600 mb-6">
          You do not have permission to view this section.
        </p>
        <UButton
          to="/"
          label="Back to Home"
          variant="outline"
        />
      </UCard>
    </div>

    <div v-else>
      <UCard class="bg-white text-gray-900 border border-gray-200 p-8 shadow-sm mb-6">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">
          Admin Events
        </h1>
        <p class="text-gray-600 text-sm">
          Manage upcoming and past events.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            v-if="!showForm"
            label="Create New Event"
            color="primary"
            @click="showForm = true"
          />
          <UButton
            v-if="showForm"
            variant="outline"
            label="Close Form"
            @click="showForm = false"
          />
        </div>
      </UCard>

      <UCard
        v-if="showForm"
        class="bg-white border border-gray-100 p-6 shadow-sm mb-8"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          Create Event
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitEvent"
        >
          <div>
            <label
              for="event-title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Event Title</label>
            <UInput
              id="event-title"
              v-model="newEvent.title"
              placeholder="e.g., Annual General Meeting"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="event-date"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Event Date & Time</label>
              <UInput
                id="event-date"
                v-model="newEvent.event_date"
                type="datetime-local"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="event-location"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Location</label>
              <UInput
                id="event-location"
                v-model="newEvent.location"
                placeholder="e.g., Lagos, Nigeria"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
          </div>
          <div>
            <label
              for="event-description"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label>
            <UTextarea
              id="event-description"
              v-model="newEvent.description"
              placeholder="Describe the event..."
              :rows="4"
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div>
            <label
              for="event-banner"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Banner Image URL (optional)</label>
            <UInput
              id="event-banner"
              v-model="newEvent.banner_url"
              placeholder="https://..."
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div class="flex items-center gap-2">
            <input
              id="event-featured"
              v-model="newEvent.featured"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            >
            <label
              for="event-featured"
              class="text-sm text-gray-700"
            >
              Featured event
            </label>
          </div>
          <div
            v-if="errors.general"
            class="p-3 rounded-lg bg-red-50 text-red-700 text-sm"
            role="alert"
          >
            {{ errors.general }}
          </div>
          <div class="flex flex-col md:flex-row gap-3 pt-2">
            <UButton
              type="submit"
              color="primary"
              label="Publish Event"
              class="w-full md:w-auto"
            />
            <UButton
              variant="outline"
              label="Cancel"
              type="button"
              class="w-full md:w-auto"
              @click="showForm = false"
            />
          </div>
        </form>
      </UCard>

      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm">
            <div class="p-4">
              <div class="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p class="font-bold text-gray-900">
                    {{ event.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(event.event_date).toLocaleString() }} · {{ event.location }}
                  </p>
                </div>
                <UBadge
                  :color="event.featured ? 'success' : 'neutral'"
                  :label="event.featured ? 'Featured' : 'Standard'"
                />
              </div>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                {{ event.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  size="xs"
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="confirmDeleteEvent(event.id)"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-if="!events.length"
          class="text-center text-gray-500 py-10"
        >
          No events yet.
        </div>
      </div>
    </div>

    <UModal v-model="confirmDeleteOpen">
      <UCard class="max-w-md mx-auto">
        <template #header>
          <h3 class="text-lg font-bold text-gray-900">
            Confirm Delete
          </h3>
        </template>
        <p class="text-gray-600 text-sm mb-4">
          Are you sure you want to delete this event? This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex gap-3">
            <UButton
              color="error"
              label="Delete"
              @click="deleteEvent(confirmDeleteId as string)"
            />
            <UButton
              variant="outline"
              label="Cancel"
              type="button"
              @click="confirmDeleteOpen = false"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/database.types'
import { slugify } from '~/utils/slug'
import SkeletonCard from '~/components/SkeletonCard.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const isAdmin = ref(false)
const loading = ref(true)
const events = ref<Event[]>([])
const showForm = ref(false)

const newEvent = reactive({
  title: '',
  description: '',
  event_date: '',
  location: '',
  banner_url: '',
  featured: false,
  slug: ''
})

const errors = reactive({
  general: ''
})

const confirmDeleteId = ref<string | null>(null)
const confirmDeleteOpen = ref(false)

watch(confirmDeleteOpen, (val) => {
  if (!val) {
    confirmDeleteId.value = null
  }
})

watch(() => newEvent.title, (val) => {
  newEvent.slug = slugify(val)
})

onMounted(async () => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  if (!user.value) {
    loading.value = false
    return
  }
  const userId = user.value.id || user.value.sub
  const { data: admin } = await client.from('admin_users').select('id').eq('id', userId).single()
  isAdmin.value = !!admin
  if (!isAdmin.value) {
    loading.value = false
    return
  }

  const { data } = await client.from('events').select('*').order('event_date', { ascending: true })
  if (data) events.value = data as Event[]
  loading.value = false
})

watch(() => route.path, () => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
})

const submitEvent = async () => {
  errors.general = ''

  const { error } = await client.from('events').insert([{
    title: newEvent.title,
    description: newEvent.description,
    event_date: newEvent.event_date,
    location: newEvent.location,
    banner_url: newEvent.banner_url || null,
    featured: newEvent.featured,
    slug: newEvent.slug || slugify(newEvent.title)
  }])

  if (error) {
    errors.general = 'Error creating event: ' + error.message
  } else {
    newEvent.title = ''
    newEvent.description = ''
    newEvent.event_date = ''
    newEvent.location = ''
    newEvent.banner_url = ''
    newEvent.featured = false
    newEvent.slug = ''
    showForm.value = false
    const { data } = await client.from('events').select('*').order('event_date', { ascending: true })
    if (data) events.value = data as Event[]
  }
}

const confirmDeleteEvent = (id: string) => {
  confirmDeleteId.value = id
  confirmDeleteOpen.value = true
}

const deleteEvent = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('events').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    events.value = events.value.filter(e => e.id !== id)
  }
}

useSeoMeta({
  title: 'Admin Events — SOSA',
  description: 'Manage events.',
  ogTitle: 'Admin Events — SOSA',
  ogDescription: 'Manage events.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/admin/events' }
  ]
})
</script>
