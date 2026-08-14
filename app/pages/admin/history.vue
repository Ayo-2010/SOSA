<template>
  <div>
    <div
      v-if="loading"
      class="space-y-4"
    >
      <SkeletonCard
        v-for="n in 3"
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
          Admin History
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
          Admin History
        </h1>
        <p class="text-gray-600 text-sm">
          Manage association history and milestones.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            v-if="!showForm"
            label="Add History Item"
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
          Add History Item
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitHistory"
        >
          <div>
            <label
              for="history-title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label>
            <UInput
              id="history-title"
              v-model="newItem.title"
              placeholder="e.g., SOSA Founded"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="history-date"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Event Date</label>
              <UInput
                id="history-date"
                v-model="newItem.event_date"
                type="date"
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="history-image"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Image URL</label>
              <UInput
                id="history-image"
                v-model="newItem.image_url"
                placeholder="https://..."
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
          </div>
          <div>
            <label
              for="history-content"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Content</label>
            <UTextarea
              id="history-content"
              v-model="newItem.content"
              placeholder="Describe this historical event or milestone..."
              :rows="5"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
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
              label="Save History"
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
          v-for="item in historyItems"
          :key="item.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm">
            <div class="p-4">
              <div class="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p class="font-bold text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.event_date ? new Date(item.event_date).toLocaleDateString() : 'No date' }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                {{ item.content }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  size="xs"
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="confirmDeleteItem(item.id)"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-if="!historyItems.length"
          class="text-center text-gray-500 py-10"
        >
          No history items yet.
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
          Are you sure you want to delete this history item? This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex gap-3">
            <UButton
              color="error"
              label="Delete"
              @click="deleteItem(confirmDeleteId as string)"
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
import type { HistoryItem } from '~/types/database.types'
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
const historyItems = ref<HistoryItem[]>([])
const showForm = ref(false)

const newItem = reactive({
  title: '',
  content: '',
  event_date: '',
  image_url: ''
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

watch(() => route.path, () => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
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

  const { data } = await client.from('history').select('*').order('event_date', { ascending: false })
  if (data) historyItems.value = data as HistoryItem[]
  loading.value = false
})

const submitHistory = async () => {
  errors.general = ''

  const { error } = await client.from('history').insert([{
    title: newItem.title,
    content: newItem.content,
    event_date: newItem.event_date || null,
    image_url: newItem.image_url || null
  }])

  if (error) {
    errors.general = 'Error adding history: ' + error.message
  } else {
    newItem.title = ''
    newItem.content = ''
    newItem.event_date = ''
    newItem.image_url = ''
    showForm.value = false
    const { data } = await client.from('history').select('*').order('event_date', { ascending: false })
    if (data) historyItems.value = data as HistoryItem[]
  }
}

const confirmDeleteItem = (id: string) => {
  confirmDeleteId.value = id
  confirmDeleteOpen.value = true
}

const deleteItem = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('history').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    historyItems.value = historyItems.value.filter(item => item.id !== id)
  }
}

useSeoMeta({
  title: 'Admin History — SOSA Network',
  description: 'Manage association history and milestones.',
  ogTitle: 'Admin History — SOSA Network',
  ogDescription: 'Manage association history and milestones.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/admin/history' }
  ]
})
</script>
