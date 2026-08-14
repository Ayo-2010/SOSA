<template>
  <div class="min-h-screen bg-gray-100 flex p-4 gap-4">
    <aside class="w-64 bg-gray-900 text-white flex flex-col justify-between rounded-lg">
      <div>
        <div class="p-6 text-xl font-bold border-b border-gray-800">
          SOSA Admin
        </div>
        <nav class="p-4 space-y-2">
          <NuxtLink
            to="/admin"
            class="block py-2.5 px-4 rounded bg-gray-800 text-white font-medium"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/users"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            Alumni Directory
          </NuxtLink>
          <NuxtLink
            to="/admin/news"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            News & Posts
          </NuxtLink>
          <NuxtLink
            to="/admin/events"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            Events
          </NuxtLink>
          <NuxtLink
            to="/admin/history"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            History
          </NuxtLink>
          <NuxtLink
            to="/admin/graduates"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            Graduates
          </NuxtLink>
          <NuxtLink
            to="/admin/gallery"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            Gallery
          </NuxtLink>
          <NuxtLink
            to="/admin/contributions"
            class="block py-2.5 px-4 rounded hover:bg-gray-800 text-gray-300"
          >
            Contributions
          </NuxtLink>
        </nav>
      </div>
      <div class="p-4 border-t border-gray-800">
        <button
          class="w-full text-left py-2 px-4 rounded text-red-400 hover:bg-gray-800"
          @click="handleLogout"
        >
          Sign Out
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col">
      <div class="bg-white shadow-sm h-16 flex items-center justify-between px-6">
        <h1 class="text-xl font-semibold text-gray-800">
          {{ pageTitle }}
        </h1>
        <div
          class="text-sm text-gray-600"
        >
          Logged in as Admin
        </div>
      </div>

      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'Dashboard Overview',
    '/admin/users': 'Alumni Directory',
    '/admin/news': 'News & Posts',
    '/admin/events': 'Events',
    '/admin/history': 'History',
    '/admin/graduates': 'Graduates',
    '/admin/gallery': 'Gallery',
    '/admin/contributions': 'Contributions'
  }
  return titles[route.path] || 'Admin'
})

const client = useSupabaseClient()
const router = useRouter()

async function handleLogout() {
  await client.auth.signOut()
  router.push('/login')
}
</script>
