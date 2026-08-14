<template>
  <div>
    <div
      v-if="loading"
      class="space-y-4"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
      >
        <div class="animate-pulse">
          <div class="h-5 bg-gray-200 rounded w-1/3 mb-2" />
          <div class="h-4 bg-gray-200 rounded w-1/2" />
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
          Admin Users
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
        <UBadge
          color="error"
          variant="subtle"
          label="Restricted Access"
          class="mb-2"
        />
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">
          Admin Users
        </h1>
        <p class="text-gray-600 text-sm">
          Manage administrator accounts and permissions.
        </p>
      </UCard>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-bold text-lg text-gray-800">
            Administrators
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th class="py-3 px-6">
                  Email
                </th>
                <th class="py-3 px-6">
                  Role
                </th>
                <th class="py-3 px-6">
                  Created
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
              <tr
                v-for="admin in adminUsers"
                :key="admin.id"
              >
                <td class="py-4 px-6 font-medium text-gray-900">
                  {{ admin.email }}
                </td>
                <td class="py-4 px-6">
                  <UBadge
                    :label="admin.role"
                    color="primary"
                    variant="subtle"
                  />
                </td>
                <td class="py-4 px-6">
                  {{ new Date(admin.created_at).toLocaleDateString() }}
                </td>
              </tr>
              <tr v-if="!adminUsers.length">
                <td
                  colspan="3"
                  class="py-8 text-center text-gray-500"
                >
                  No admin users found.
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
import type { AdminUser } from '~/types/database.types'

definePageMeta({
  layout: 'admin'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const isAdmin = ref(false)
const loading = ref(true)
const adminUsers = ref<AdminUser[]>([])

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

  const { data } = await client.from('admin_users').select('*').order('created_at', { ascending: false })
  if (data) adminUsers.value = data
  loading.value = false
})

useSeoMeta({
  title: 'Admin Users — SOSA Network',
  description: 'Manage administrator accounts.',
  ogTitle: 'Admin Users — SOSA Network',
  ogDescription: 'Manage administrator accounts.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/admin/users' }
  ]
})
</script>
