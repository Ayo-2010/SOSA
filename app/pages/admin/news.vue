<template>
  <div>
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
          Admin News
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
          Admin News
        </h1>
        <p class="text-gray-600 text-sm">
          Manage news posts and announcements.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            v-if="!showForm"
            label="Create New Post"
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
          Create Post
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitPost"
        >
          <div>
            <label
              for="post-title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label>
            <UInput
              id="post-title"
              v-model="newPost.title"
              placeholder="Post title"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div>
            <label
              for="post-category"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Category</label>
            <select
              id="post-category"
              v-model="newPost.category"
              class="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option
                v-for="cat in ['News', 'School Milestone', 'Program Update', 'Alumni Spotlight']"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>
          <div>
            <label
              for="post-content"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Content</label>
            <UTextarea
              id="post-content"
              v-model="newPost.content"
              placeholder="Write your post content here..."
              :rows="6"
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div>
            <label
              for="post-image"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Cover Image</label>
            <input
              id="post-image"
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700"
              @change="handleImageUpload($event, 'news')"
            >
            <img
              v-if="newPost.image_url"
              :src="newPost.image_url"
              :alt="newPost.title"
              class="mt-3 w-full h-40 object-cover rounded-lg"
            >
          </div>
          <div class="flex items-center gap-2">
            <input
              id="post-featured"
              v-model="newPost.featured"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            >
            <label
              for="post-featured"
              class="text-sm text-gray-700"
            >
              Featured post
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
              :loading="uploading"
              label="Publish Post"
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
          v-for="post in posts"
          :key="post.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm">
            <div class="p-4">
              <div class="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p class="font-bold text-gray-900">
                    {{ post.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ post.category }} · {{ new Date(post.created_at).toLocaleDateString() }}
                  </p>
                </div>
                <UBadge
                  :color="post.featured ? 'success' : 'neutral'"
                  :label="post.featured ? 'Featured' : 'Standard'"
                />
              </div>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                {{ post.content }}
              </p>
              <img
                v-if="post.image_url"
                :src="post.image_url"
                :alt="newPost.title"
                class="w-full h-40 object-cover rounded-lg mb-3"
              >
              <div class="flex flex-wrap gap-2">
                <UButton
                  size="xs"
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="confirmDeletePost(post.id)"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-if="!posts.length"
          class="text-center text-gray-500 py-10"
        >
          No posts yet.
        </div>
      </div>
    </div>

    <UModal
      v-if="confirmDeleteOpen"
      v-model="confirmDeleteOpen"
    >
      <UCard class="max-w-md mx-auto">
        <template #header>
          <h3 class="text-lg font-bold text-gray-900">
            Confirm Delete
          </h3>
        </template>
        <p class="text-gray-600 text-sm mb-4">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex gap-3">
            <UButton
              color="error"
              label="Delete"
              @click="deletePost(confirmDeleteId as string)"
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
import type { Post } from '~/types/database.types'
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
const posts = ref<Post[]>([])
const showForm = ref(false)

const newPost = reactive({
  title: '',
  content: '',
  category: 'News',
  featured: false,
  image_url: '',
  slug: ''
})

const errors = reactive({
  general: ''
})

const uploading = ref(false)

const handleImageUpload = async (event: Event, type: string) => {
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
        path: type
      }
    })

    if (result.url) {
      newPost.image_url = result.url
    } else if (result.error) {
      errors.general = result.error
    }
  } catch {
    errors.general = 'Failed to upload image'
  } finally {
    uploading.value = false
  }
}

watch(() => newPost.title, (val) => {
  newPost.slug = slugify(val)
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

  const { data } = await client.from('posts').select('*').eq('category', 'News').order('created_at', { ascending: false })
  if (data) posts.value = data as Post[]
  loading.value = false
})

const submitPost = async () => {
  errors.general = ''

  const { error } = await client.from('posts').insert([{
    title: newPost.title,
    content: newPost.content,
    category: 'News',
    author: user.value?.email || 'Admin',
    featured: newPost.featured,
    image_url: newPost.image_url || null,
    slug: newPost.slug || slugify(newPost.title)
  }])

  if (error) {
    errors.general = 'Error creating post: ' + error.message
  } else {
    newPost.title = ''
    newPost.content = ''
    newPost.category = 'News'
    newPost.featured = false
    newPost.image_url = ''
    newPost.slug = ''
    showForm.value = false
    const { data } = await client.from('posts').select('*').eq('category', 'News').order('created_at', { ascending: false })
    if (data) posts.value = data as Post[]
  }
}

const confirmDeletePost = (id: string) => {
  confirmDeleteId.value = id
  confirmDeleteOpen.value = true
}

const deletePost = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('posts').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    posts.value = posts.value.filter(p => p.id !== id)
  }
}

useSeoMeta({
  title: 'Admin News & Blog — SOSA',
  description: 'Manage news posts and blog articles.',
  ogTitle: 'Admin News & Blog — SOSA',
  ogDescription: 'Manage news posts and blog articles.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/admin/news' }
  ]
})
</script>
