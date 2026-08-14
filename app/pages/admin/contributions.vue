<template>
  <div>
    <div
      v-if="loading"
      class="space-y-4"
    >
      <SkeletonCard
        v-for="n in 4"
        :key="n"
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
          Admin Contributions
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
          Admin Contributions
        </h1>
        <p class="text-gray-600 text-sm">
          Verify and record member contribution payments.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            v-if="!showForm"
            label="Record New Contribution"
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
          Record Contribution
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitContribution"
        >
          <div>
            <label
              for="contrib-member"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Member</label>
            <USelect
              id="contrib-member"
              v-model="newContribution.user_id"
              :options="members.map(m => ({ label: `${m.full_name} (${m.graduation_set})`, value: m.id }))"
              required
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="contrib-amount"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Amount (₦)</label>
              <UInput
                id="contrib-amount"
                v-model="newContribution.amount"
                type="number"
                placeholder="1000"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="contrib-period"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Period (e.g., August 2026)</label>
              <UInput
                id="contrib-period"
                v-model="newContribution.period"
                placeholder="August 2026"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="contrib-status"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Status</label>
              <USelect
                id="contrib-status"
                v-model="newContribution.status"
                :options="['pending', 'verified', 'rejected']"
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="contrib-receipt"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Receipt URL (optional)</label>
              <UInput
                id="contrib-receipt"
                v-model="newContribution.receipt_url"
                placeholder="https://..."
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
              label="Save Record"
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
          v-for="c in contributions"
          :key="c.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm">
            <div class="p-4">
              <div class="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p class="font-bold text-gray-900">
                    {{ members.find(m => m.id === c.user_id)?.full_name || 'Unknown Member' }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ members.find(m => m.id === c.user_id)?.graduation_set || '' }}
                  </p>
                </div>
                <UBadge
                  :color="c.status === 'verified' ? 'success' : c.status === 'rejected' ? 'error' : 'warning'"
                  :label="c.status"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                <div>Amount: <span class="font-semibold text-gray-900">₦{{ c.amount }}</span></div>
                <div>Period: <span class="font-semibold text-gray-900">{{ c.period }}</span></div>
                <div>Recorded: <span class="font-semibold text-gray-900">{{ new Date(c.created_at).toLocaleDateString() }}</span></div>
              </div>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-if="c.status !== 'verified'"
                  size="xs"
                  label="Verify"
                  color="success"
                  variant="outline"
                  @click="verifyContribution(c.id)"
                />
                <UButton
                  size="xs"
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="confirmDeleteId = c.id; confirmDeleteOpen = true"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-if="!contributions.length"
          class="text-center text-gray-500 py-10"
        >
          No contributions recorded yet.
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
            Are you sure you want to delete this contribution record? This action cannot be undone.
          </p>
          <template #footer>
            <div class="flex gap-3">
              <UButton
                color="error"
                label="Delete"
                @click="confirmDeleteId && deleteContribution(confirmDeleteId)"
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
  </div>
</template>

<script setup lang="ts">
import type { Profile, Contribution } from '~/types/database.types'
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
const members = ref<Profile[]>([])
const contributions = ref<Contribution[]>([])
const showForm = ref(false)

const newContribution = reactive({
  user_id: '',
  amount: '',
  period: '',
  status: 'verified',
  receipt_url: ''
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

const validateReceiptUrl = (url: string): boolean => {
  if (!url) return true
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
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

  const [{ data: profiles }, { data: contribs }] = await Promise.all([
    client.from('public_profiles').select('id, full_name, graduation_set'),
    client.from('contributions').select('*').order('created_at', { ascending: false })
  ])

  if (profiles) members.value = profiles as Profile[]
  if (contribs) contributions.value = contribs as Contribution[]
  loading.value = false
})

watch(() => route.path, () => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
})

const submitContribution = async () => {
  errors.general = ''

  if (newContribution.receipt_url && !validateReceiptUrl(newContribution.receipt_url)) {
    errors.general = 'Please enter a valid URL (http:// or https://)'
    return
  }

  const { error } = await client.from('contributions').insert([{
    user_id: newContribution.user_id,
    amount: parseFloat(newContribution.amount),
    period: newContribution.period,
    status: newContribution.status,
    receipt_url: newContribution.receipt_url || null,
    verified_by: user.value?.id,
    verified_at: newContribution.status === 'verified' ? new Date().toISOString() : null
  }])

  if (error) {
    errors.general = 'Error recording contribution: ' + error.message
  } else {
    newContribution.user_id = ''
    newContribution.amount = ''
    newContribution.period = ''
    newContribution.status = 'verified'
    newContribution.receipt_url = ''
    showForm.value = false
    const { data } = await client.from('contributions').select('*').order('created_at', { ascending: false })
    if (data) contributions.value = data as Contribution[]
  }
}

const deleteContribution = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('contributions').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    contributions.value = contributions.value.filter(c => c.id !== id)
  }
}

const verifyContribution = async (id: string) => {
  const { error } = await client.from('contributions').update({
    status: 'verified',
    verified_by: user.value?.id,
    verified_at: new Date().toISOString()
  }).eq('id', id)

  if (error) {
    errors.general = 'Error verifying: ' + error.message
  } else {
    const c = contributions.value.find(c => c.id === id)
    if (c) {
      c.status = 'verified'
      c.verified_by = user.value?.id
      c.verified_at = new Date().toISOString()
    }
  }
}

useSeoMeta({
  title: 'Admin Contributions — SOSA Network',
  description: 'Verify and record member contribution payments.',
  ogTitle: 'Admin Contributions — SOSA Network',
  ogDescription: 'Verify and record member contribution payments.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/admin/contributions' }
  ]
})
</script>
