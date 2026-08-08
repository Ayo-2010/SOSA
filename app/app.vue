<script setup>
const links = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Alumni Directory', to: '/directory' },
  { label: 'Register / Join', to: '/register' }
]

const client = useSupabaseClient()
const user = useSupabaseUser()
const isAdmin = ref(false)

onMounted(async () => {
  if (!user.value) return
  const { data } = await client.from('admin_users').select('id').eq('id', user.value.id).single()
  isAdmin.value = !!data
})

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <AppHeader :links="links">
      <UButton
        v-if="isAdmin"
        label="Admin"
        variant="ghost"
        size="sm"
        to="/admin"
        class="ml-2"
      />
    </AppHeader>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>
