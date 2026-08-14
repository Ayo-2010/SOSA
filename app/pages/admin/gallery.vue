<template>
  <div>
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
          Admin Gallery
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
          Admin Gallery
        </h1>
        <p class="text-gray-600 text-sm">
          Manage photo gallery items.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            v-if="!showForm"
            label="Add Gallery Item"
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
          Add Gallery Item
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitGalleryItem"
        >
          <div>
            <label
              for="gallery-title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label>
            <UInput
              id="gallery-title"
              v-model="newItem.title"
              placeholder="e.g., Graduation Day 2026"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div>
            <label
              for="gallery-image"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Image</label>
            <input
              id="gallery-image"
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700"
              @change="handleImageUpload($event)"
            >
            <img
              v-if="newItem.image_url"
              :src="newItem.image_url"
              :alt="newItem.title"
              class="mt-3 w-full h-40 object-cover rounded-lg"
            >
          </div>
          <div>
            <label
              for="gallery-caption"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Caption (optional)</label>
            <UInput
              id="gallery-caption"
              v-model="newItem.caption"
              placeholder="A short description"
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="gallery-category"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Category</label>
              <select
                id="gallery-category"
                v-model="newItem.category"
                class="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option
                  v-for="cat in ['Campus', 'Events', 'Milestones', 'Archive']"
                  :key="cat"
                  :value="cat"
                >
                  {{ cat }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="gallery-year"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Event Year (optional)</label>
              <UInput
                id="gallery-year"
                v-model="newItem.event_year"
                placeholder="e.g., 2026"
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
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
              :loading="uploading"
              label="Add to Gallery"
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

      <div class="flex flex-wrap gap-2 mb-4">
        <UButton
          :variant="filter === 'all' ? 'solid' : 'outline'"
          label="All"
          size="xs"
          @click="filter = 'all'"
        />
        <UButton
          :variant="filter === 'upcoming' ? 'solid' : 'outline'"
          label="Upcoming"
          size="xs"
          @click="filter = 'upcoming'"
        />
        <UButton
          :variant="filter === 'past' ? 'solid' : 'outline'"
          label="Past"
          size="xs"
          @click="filter = 'past'"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="item in filteredItems"
          :key="item.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm h-full">
            <img
              :src="item.image_url"
              :alt="item.title"
              class="w-full h-48 object-cover rounded-lg mb-3"
            >
            <div class="p-3">
              <p class="font-bold text-gray-900">
                {{ item.title }}
              </p>
              <p class="text-sm text-gray-500">
                {{ item.caption || 'No caption' }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2">
                <UBadge
                  :color="getCategoryColor(item.category)"
                  :label="item.category || 'Uncategorized'"
                />
                <UBadge
                  :color="getYearColor(item.event_year)"
                  :label="getYearLabel(item.event_year)"
                />
              </div>
              <div class="mt-3">
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
          v-if="!filteredItems.length"
          class="col-span-full text-center text-gray-500 py-10"
        >
          No gallery items match this filter.
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
          Are you sure you want to delete this gallery item? This action cannot be undone.
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
import type { GalleryItem } from '~/types/database.types'
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
const galleryItems = ref<GalleryItem[]>([])
const showForm = ref(false)
const filter = ref<'all' | 'upcoming' | 'past'>('all')

const newItem = reactive({
  title: '',
  image_url: '',
  caption: '',
  category: 'Campus',
  event_year: ''
})

const errors = reactive({
  general: ''
})

const uploading = ref(false)

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base64Data = result.split(',')[1]
        resolve(base64Data!)
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })

    const result = await $fetch<{ url?: string, error?: string }>('/api/upload', {
      method: 'POST',
      body: {
        file: {
          data: base64,
          name: file.name,
          type: file.type
        },
        bucket: 'images',
        path: 'gallery'
      }
    })

    if (result.url) {
      newItem.image_url = result.url
    } else if (result.error) {
      errors.general = result.error
    }
  } catch {
    errors.general = 'Failed to upload image'
  } finally {
    uploading.value = false
  }
}

const confirmDeleteId = ref<string | null>(null)
const confirmDeleteOpen = ref(false)

watch(confirmDeleteOpen, (val) => {
  if (!val) {
    confirmDeleteId.value = null
  }
})

const getCurrentYear = () => new Date().getFullYear().toString()

const isUpcoming = (item: GalleryItem) => {
  if (!item.event_year) return false
  return parseInt(item.event_year) >= parseInt(getCurrentYear())
}

const filteredItems = computed(() => {
  if (filter.value === 'upcoming') {
    return galleryItems.value.filter(isUpcoming)
  }
  if (filter.value === 'past') {
    return galleryItems.value.filter(item => !isUpcoming(item))
  }
  return galleryItems.value
})

const getCategoryColor = (category?: string | null | undefined) => {
  switch (category) {
    case 'Campus': return 'primary'
    case 'Events': return 'success'
    case 'Milestones': return 'warning'
    case 'Archive': return 'neutral'
    default: return 'neutral'
  }
}

const getYearColor = (year?: string | null | undefined) => {
  if (!year) return 'neutral'
  return isUpcoming({ event_year: year } as GalleryItem) ? 'success' : 'error'
}

const getYearLabel = (year?: string | null | undefined) => {
  if (!year) return 'No year'
  return isUpcoming({ event_year: year } as GalleryItem) ? 'Upcoming' : 'Past'
}

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

  const { data } = await client.from('gallery').select('*').order('created_at', { ascending: false })
  if (data) galleryItems.value = data as GalleryItem[]
  loading.value = false
})

watch(() => route.path, () => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
})

const submitGalleryItem = async () => {
  errors.general = ''

  if (!newItem.image_url) {
    errors.general = 'Image URL is required'
    return
  }

  const { error } = await client.from('gallery').insert([{
    title: newItem.title,
    image_url: newItem.image_url,
    caption: newItem.caption || null,
    category: newItem.category,
    event_year: newItem.event_year || null
  }])

  if (error) {
    errors.general = 'Error adding gallery item: ' + error.message
  } else {
    newItem.title = ''
    newItem.image_url = ''
    newItem.caption = ''
    newItem.category = 'Campus'
    newItem.event_year = ''
    showForm.value = false
    const { data } = await client.from('gallery').select('*').order('created_at', { ascending: false })
    if (data) galleryItems.value = data as GalleryItem[]
  }
}

const confirmDeleteItem = (id: string) => {
  confirmDeleteId.value = id
  confirmDeleteOpen.value = true
}

const deleteItem = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('gallery').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    galleryItems.value = galleryItems.value.filter(item => item.id !== id)
  }
}

useSeoMeta({
  title: 'Admin Gallery — SOSA Network',
  description: 'Manage gallery photos.',
  ogTitle: 'Admin Gallery — SOSA Network',
  ogDescription: 'Manage gallery photos.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/admin/gallery' }
  ]
})
</script>
