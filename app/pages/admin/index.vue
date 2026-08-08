<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const isAdmin = ref(false)
const loading = ref(true)

onMounted(async () => {
  if (!user.value) {
    loading.value = false
    return
  }
  const { data } = await client.from('admin_users').select('id').eq('id', user.value.id).single()
  isAdmin.value = !!data
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-3xl">
      <div
        v-if="loading"
        class="text-gray-500"
      >
        Checking access...
      </div>
      <div
        v-else-if="!user"
        class="text-center py-20"
      >
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
      </div>
      <div
        v-else-if="!isAdmin"
        class="text-center py-20"
      >
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
      </div>
      <div v-else>
        <div class="mb-8">
          <UBadge
            color="error"
            variant="subtle"
            label="Restricted Access"
            class="mb-2"
          />
          <h1 class="text-3xl font-extrabold text-gray-900">
            SOSA Admin Dashboard
          </h1>
          <p class="text-gray-600 text-sm">
            Manage contributions, events, and platform updates.
          </p>
        </div>
        <div class="flex gap-2 mb-6 border-b border-gray-200 pb-4">
          <UButton
            :variant="$route.path === '/admin' ? 'solid' : 'ghost'"
            label="Dashboard"
            to="/admin"
          />
          <UButton
            :variant="$route.path === '/admin/contributions' ? 'solid' : 'ghost'"
            label="Contributions"
            to="/admin/contributions"
          />
        </div>
        <UCard class="bg-white border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            Welcome, Admin
          </h3>
          <p class="text-gray-600">
            Use the tabs above to manage contributions or other admin tasks.
          </p>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
