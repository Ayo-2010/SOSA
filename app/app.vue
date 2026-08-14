<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <SiteHeader :links="links">
      <template #actions>
        <template v-if="!user">
          <UButton
            label="Member Login"
            variant="outline"
            size="sm"
            class="hidden sm:inline-flex"
            @click="openLogin"
          />
          <UButton
            icon="i-heroicons-user"
            variant="outline"
            size="sm"
            class="sm:hidden"
            @click="openLogin"
          />
        </template>
        <template v-else>
          <UButton
            v-if="isAdmin"
            label="Admin"
            variant="ghost"
            size="sm"
            to="/admin"
            class="hidden sm:inline-flex"
          />
          <UButton
            v-if="isAdmin"
            icon="i-heroicons-cog-6-tooth"
            variant="ghost"
            size="sm"
            to="/admin"
            class="sm:hidden"
          />
          <UButton
            :label="initials"
            variant="solid"
            size="sm"
            class="hidden sm:inline-flex !bg-gray-200 !text-gray-900 cursor-default"
          />
          <UButton
            icon="i-heroicons-user"
            variant="solid"
            size="sm"
            class="sm:hidden !bg-gray-200 !text-gray-900 cursor-default"
          />
          <UButton
            label="Logout"
            variant="outline"
            size="sm"
            @click="handleLogout"
          />
        </template>
      </template>
      <template #mobile-actions>
        <template v-if="!user">
          <UButton
            label="Member Login"
            variant="outline"
            size="md"
            class="w-full"
            @click="openLogin"
          />
        </template>
        <template v-else>
          <UButton
            v-if="isAdmin"
            label="Admin Dashboard"
            variant="ghost"
            size="md"
            to="/admin"
            class="w-full mb-2"
          />
          <UButton
            :label="initials"
            variant="solid"
            size="md"
            class="w-full mb-2 !bg-gray-200 !text-gray-900 cursor-default"
          />
          <UButton
            label="Logout"
            variant="outline"
            size="md"
            class="w-full"
            @click="handleLogout"
          />
        </template>
      </template>
    </SiteHeader>

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded"
    >
      Skip to main content
    </a>

    <main
      id="main-content"
      class="flex-1"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

const windowWidth = ref(0)
let resizeHandler: (() => void) | null = null

const links = computed(() => {
  if (windowWidth.value < 865 && windowWidth.value > 0) {
    return [
      { label: 'Home', to: '/' },
      {
        label: 'About',
        children: [
          { label: 'About', to: '/about' },
          { label: 'History', to: '/history' }
        ]
      },
      { label: 'Donate', to: '/donate' },
      { label: 'Join', to: '/register' },
      {
        label: 'Content',
        children: [
          { label: 'News', to: '/news' },
          { label: 'Blog', to: '/blog' },
          { label: 'Events', to: '/events' },
          { label: 'Gallery', to: '/gallery' },
          { label: 'Directory', to: '/directory' }
        ]
      }
    ]
  }
  return [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'History', to: '/history' },
    { label: 'Directory', to: '/directory' },
    { label: 'Donate', to: '/donate' },
    { label: 'Join', to: '/register' },
    {
      label: 'Content',
      children: [
        { label: 'News', to: '/news' },
        { label: 'Blog', to: '/blog' },
        { label: 'Events', to: '/events' },
        { label: 'Gallery', to: '/gallery' }
      ]
    }
  ]
})

onMounted(() => {
  windowWidth.value = window.innerWidth
  resizeHandler = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const isAdmin = ref(false)
const initials = ref('')

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const fetchProfile = async () => {
  console.log('[DEBUG] fetchProfile called, user.value?.id:', user.value?.id, 'user.value?.sub:', user.value?.sub)
  if (!user.value?.id && !user.value?.sub) return
  const userId = user.value.id || user.value.sub
  const { data } = await client.from('profiles').select('full_name').eq('id', userId).single()
  console.log('[DEBUG] fetchProfile result:', data)
  initials.value = data?.full_name ? getInitials(data.full_name) : user.value.email?.charAt(0).toUpperCase() || '?'
  console.log('[DEBUG] initials set to:', initials.value)
}

const checkAdmin = async () => {
  console.log('[DEBUG] checkAdmin called, user.value?.id:', user.value?.id, 'user.value?.sub:', user.value?.sub)
  if (!user.value?.id && !user.value?.sub) {
    isAdmin.value = false
    console.log('[DEBUG] isAdmin set to false (no user id/sub)')
    return
  }
  const userId = user.value.id || user.value.sub
  try {
    const { data, error } = await client.from('admin_users').select('id').eq('id', userId).single()
    console.log('[DEBUG] checkAdmin data:', data, 'error:', error)
    isAdmin.value = !!data
    console.log('[DEBUG] isAdmin set to:', isAdmin.value)
  } catch (error) {
    console.log('[DEBUG] checkAdmin catch error:', error)
    isAdmin.value = false
  }
}

watch(user, async () => {
  console.log('[DEBUG] user watcher fired, user.value:', user.value)
  await checkAdmin()
  await fetchProfile()
})

watch(isAdmin, (val) => {
  console.log('[DEBUG] isAdmin changed to:', val)
})

watch(initials, (val) => {
  console.log('[DEBUG] initials changed to:', val)
})

onMounted(async () => {
  console.log('[DEBUG] onMounted fired')
  await checkAdmin()
  await fetchProfile()
})

const openLogin = () => {
  router.push('/login')
}

const handleLogout = async () => {
  await client.auth.signOut()
  isAdmin.value = false
  router.push('/')
}

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})
</script>
