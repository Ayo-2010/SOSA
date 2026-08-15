<template>
  <div>
    <div
      v-if="loading"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="n in 3"
          :key="n"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div class="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="animate-pulse">
            <div class="h-5 bg-gray-200 rounded w-1/3 mb-3" />
            <div class="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="animate-pulse h-6 bg-gray-200 rounded w-1/3" />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th class="py-3 px-6">
                  Full Name
                </th>
                <th class="py-3 px-6">
                  Graduation Set
                </th>
                <th class="py-3 px-6">
                  Profession
                </th>
                <th class="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
              <tr
                v-for="n in 3"
                :key="n"
              >
                <td class="py-4 px-6">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-3/4" />
                </td>
                <td class="py-4 px-6">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-1/2" />
                </td>
                <td class="py-4 px-6">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-2/3" />
                </td>
                <td class="py-4 px-6">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-20" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
          SOSA Admin Area
        </h1>
        <p class="text-gray-600 mb-6">
          You must be logged in as an admin to access this area.
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
          Your account does not have admin privileges.
        </p>
        <UButton
          to="/"
          label="Back to Home"
          variant="outline"
        />
      </UCard>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p class="text-sm font-medium text-gray-500">
            Total Registered Members
          </p>
          <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ stats.totalMembers }}
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p class="text-sm font-medium text-gray-500">
            Upcoming Events
          </p>
          <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ stats.upcomingEvents }}
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p class="text-sm font-medium text-gray-500">
            Published Posts
          </p>
          <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ stats.publishedPosts }}
          </p>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-bold text-gray-900 mb-4">
          Admin Quick Access
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            to="/admin/users"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              Alumni Directory
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              View & manage members
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/news"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              News & Posts
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Create blog and news posts
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/events"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              Events
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Manage upcoming and past events
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/history"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              History
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Manage association history
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/graduates"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              Graduates
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Manage graduating student book
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/gallery"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              Gallery
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Manage photo gallery
            </p>
          </NuxtLink>
          <NuxtLink
            to="/admin/contributions"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
          >
            <p class="text-sm font-medium text-gray-500">
              Contributions
            </p>
            <p class="text-base font-semibold text-gray-900 mt-1">
              Verify and record payments
            </p>
          </NuxtLink>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-bold text-lg text-gray-800">
            Recent Registrations
          </h3>
          <NuxtLink
            to="/admin/users"
            class="text-sm text-blue-600 hover:underline"
          >
            View All
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th class="py-3 px-6">
                  Full Name
                </th>
                <th class="py-3 px-6">
                  Graduation Set
                </th>
                <th class="py-3 px-6">
                  Profession
                </th>
                <th class="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
              <tr
                v-for="item in recentRegistrations"
                :key="item.id"
              >
                <td class="py-4 px-6 font-medium text-gray-900">
                  {{ item.full_name }}
                </td>
                <td class="py-4 px-6">
                  {{ item.graduation_set }}
                </td>
                <td class="py-4 px-6">
                  {{ item.profession || 'N/A' }}
                </td>
                <td class="py-4 px-6">
                  <button class="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                  <button class="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!recentRegistrations.length">
                <td
                  colspan="4"
                  class="py-8 text-center text-gray-500"
                >
                  No registrations yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile, Event, Post } from '~/types/database.types'

definePageMeta({
  layout: 'admin'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const isAdmin = ref(false)
const loading = ref(true)
const profiles = ref<Profile[]>([])
const events = ref<Event[]>([])
const posts = ref<Post[]>([])

const stats = reactive({
  totalMembers: 0,
  upcomingEvents: 0,
  publishedPosts: 0
})

const recentRegistrations = computed(() => {
  return profiles.value
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
})

onMounted(async () => {
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

  const [{ data: profilesData }, { data: eventsData }, { data: postsData }] = await Promise.all([
    client.from('profiles').select('*'),
    client.from('events').select('*'),
    client.from('posts').select('*')
  ])

  if (profilesData) {
    profiles.value = profilesData
    stats.totalMembers = profilesData.length
  }
  if (eventsData) {
    events.value = eventsData
    const now = new Date()
    stats.upcomingEvents = eventsData.filter((e: Event) => new Date(e.event_date) >= now).length
  }
  if (postsData) {
    posts.value = postsData
    stats.publishedPosts = postsData.length
  }
  loading.value = false
})

useSeoMeta({
  title: 'Admin Dashboard — SOSA',
  description: 'Manage contributions, events, and platform updates.',
  ogTitle: 'Admin Dashboard — SOSA',
  ogDescription: 'Manage contributions, events, and platform updates.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/admin' }
  ]
})
</script>
