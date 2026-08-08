<script setup lang="ts">
import type { Profile, Contribution } from '~/types/database.types'

const client = useSupabaseClient()
const user = useSupabaseUser()
const isAdmin = ref(false)
const loading = ref(true)
const members = ref<Profile[]>([])
const contributions = ref<Contribution[]>([])

const newContribution = reactive({
  user_id: '',
  amount: '',
  period: '',
  status: 'verified',
  receipt_url: ''
})

const showForm = ref(false)

onMounted(async () => {
  if (!user.value) {
    loading.value = false
    return
  }
  const { data: admin } = await client.from('admin_users').select('id').eq('id', user.value.id).single()
  isAdmin.value = !!admin
  if (!isAdmin.value) {
    loading.value = false
    return
  }

  const [{ data: profiles }, { data: contribs }] = await Promise.all([
    client.from('profiles').select('id, full_name, graduation_set'),
    client.from('contributions').select('*').order('created_at', { ascending: false })
  ])

  if (profiles) members.value = profiles
  if (contribs) contributions.value = contribs
  loading.value = false
})

const submitContribution = async () => {
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
    alert('Error recording contribution: ' + error.message)
  } else {
    alert('Contribution recorded successfully!')
    newContribution.user_id = ''
    newContribution.amount = ''
    newContribution.period = ''
    newContribution.status = 'verified'
    newContribution.receipt_url = ''
    showForm.value = false
    const { data } = await client.from('contributions').select('*').order('created_at', { ascending: false })
    if (data) contributions.value = data
  }
}

const deleteContribution = async (id: string) => {
  if (!confirm('Delete this contribution record?')) return
  const { error } = await client.from('contributions').delete().eq('id', id)
  if (error) {
    alert('Error deleting: ' + error.message)
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
    alert('Error verifying: ' + error.message)
  } else {
    const c = contributions.value.find(c => c.id === id)
    if (c) {
      c.status = 'verified'
      c.verified_by = user.value?.id
      c.verified_at = new Date().toISOString()
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-4xl">
      <div
        v-if="loading"
        class="text-gray-500"
      >
        Loading...
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
          Admin Contributions
        </h1>
        <p class="text-gray-600 mb-6">
          Please log in as an admin.
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
        <p class="text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
      <div v-else>
        <div class="mb-8">
          <UBadge
            color="error"
            variant="subtle"
            label="Restricted Access"
            class="mb-2"
          />
          <h1 class="text-3xl font-extrabold text-gray-900 mb-2">
            Admin Contributions
          </h1>
          <p class="text-gray-600 text-sm">
            Verify and record member monthly dues payments.
          </p>
        </div>

        <div class="mb-6">
          <UButton
            v-if="!showForm"
            label="Record New Contribution"
            color="primary"
            @click="showForm = true"
          />
        </div>

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
              <label class="block text-sm font-medium text-gray-700 mb-1">Member</label>
              <USelect
                v-model="newContribution.user_id"
                :options="members.map(m => ({ label: `${m.full_name} (${m.graduation_set})`, value: m.id }))"
                required
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                <UInput
                  v-model="newContribution.amount"
                  type="number"
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Period (e.g., August 2026)</label>
                <UInput
                  v-model="newContribution.period"
                  placeholder="August 2026"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <USelect
                  v-model="newContribution.status"
                  :options="['pending', 'verified', 'rejected']"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Receipt URL (optional)</label>
                <UInput
                  v-model="newContribution.receipt_url"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <UButton
                type="submit"
                color="primary"
                label="Save Record"
              />
              <UButton
                variant="outline"
                label="Cancel"
                @click="showForm = false"
              />
            </div>
          </form>
        </UCard>

        <div class="space-y-4">
          <div
            v-for="c in contributions"
            :key="c.id"
            class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div class="flex items-start justify-between mb-2">
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
            <div class="flex gap-2">
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
                @click="deleteContribution(c.id)"
              />
            </div>
          </div>
          <div
            v-if="!contributions.length"
            class="text-center text-gray-500 py-10"
          >
            No contributions recorded yet.
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
