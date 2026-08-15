<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <SkeletonCard
        v-for="n in 8"
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
          Admin Graduates
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
          Admin Graduates
        </h1>
        <p class="text-gray-600 text-sm">
          Manage the graduating student book for 2022–2026.
        </p>
      </UCard>

      <div class="flex flex-wrap gap-3 mb-6">
        <UButton
          v-for="set in ['2022', '2023', '2024', '2025', '2026']"
          :key="set"
          :variant="selectedSet === set ? 'solid' : 'outline'"
          :color="selectedSet === set ? 'primary' : 'neutral'"
          :label="`Class of ${set}`"
          @click="selectedSet = set"
        />
      </div>

      <div
        v-if="!showForm"
        class="mb-6"
      >
        <UButton
          label="Add Graduate"
          color="primary"
          @click="showForm = true"
        />
      </div>

      <UCard
        v-if="showForm"
        class="bg-white border border-gray-100 p-6 shadow-sm mb-8"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          Add Graduate
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="submitGraduate"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="grad-name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Full Name</label>
              <UInput
                id="grad-name"
                v-model="newGraduate.full_name"
                placeholder="e.g., John Doe"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="grad-set"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Graduating Set</label>
              <select
                id="grad-set"
                v-model="newGraduate.graduation_set"
                class="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="2022">
                  2022
                </option>
                <option value="2023">
                  2023
                </option>
                <option value="2024">
                  2024
                </option>
                <option value="2025">
                  2025
                </option>
                <option value="2026">
                  2026
                </option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="grad-profession"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Profession</label>
              <UInput
                id="grad-profession"
                v-model="newGraduate.profession"
                placeholder="e.g., Engineer"
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
            <div>
              <label
                for="grad-city"
                class="block text-sm font-medium text-gray-700 mb-1"
              >City</label>
              <UInput
                id="grad-city"
                v-model="newGraduate.city"
                placeholder="e.g., Lagos"
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
              />
            </div>
          </div>
          <div>
            <label
              for="grad-phone"
              class="block text-sm font-medium text-gray-700 mb-1"
            >WhatsApp Number</label>
            <UInput
              id="grad-phone"
              v-model="newGraduate.whatsapp_number"
              placeholder="+123 456 7890"
              class="w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
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
              label="Save Graduate"
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
          v-for="item in filteredGraduates"
          :key="item.id"
        >
          <UCard class="bg-white border border-gray-200 shadow-sm">
            <div class="p-4">
              <div class="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p class="font-bold text-gray-900">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Class of {{ item.set }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                {{ item.profession || 'No profession listed' }}
              </p>
              <p class="text-sm text-gray-500">
                {{ item.location || 'No location listed' }}
              </p>
              <div class="mt-3">
                <UButton
                  size="xs"
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="confirmDelete(item.id)"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-if="!filteredGraduates.length"
          class="text-center text-gray-500 py-10"
        >
          No graduates in this class yet.
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
          Are you sure you want to remove this graduate? This action cannot be undone.
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
import type { DirectoryAlumnus, Profile } from '~/types/database.types'
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
const graduates = ref<DirectoryAlumnus[]>([])
const selectedSet = ref('2026')
const showForm = ref(false)

const newGraduate = reactive({
  full_name: '',
  graduation_set: '2026',
  profession: '',
  city: '',
  whatsapp_number: ''
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

  const { data } = await client.from('profiles').select('*')
  if (data) {
    graduates.value = data
      .filter((p: Profile) => p.graduation_set && ['2022', '2023', '2024', '2025', '2026'].includes(p.graduation_set))
      .map((p: Profile) => ({
        id: p.id,
        name: p.full_name,
        set: p.graduation_set,
        profession: p.profession || '',
        location: p.city || '',
        phone: p.whatsapp_number || ''
      }))
  }
  loading.value = false
})

const filteredGraduates = computed(() => {
  return graduates.value.filter(g => g.set === selectedSet.value)
})

const submitGraduate = async () => {
  errors.general = ''

  const { error } = await client.from('profiles').insert([{
    full_name: newGraduate.full_name,
    graduation_set: newGraduate.graduation_set,
    profession: newGraduate.profession || null,
    city: newGraduate.city || null,
    whatsapp_number: newGraduate.whatsapp_number || null,
    bio: null
  }])

  if (error) {
    errors.general = 'Error adding graduate: ' + error.message
  } else {
    newGraduate.full_name = ''
    newGraduate.graduation_set = selectedSet.value
    newGraduate.profession = ''
    newGraduate.city = ''
    newGraduate.whatsapp_number = ''
    showForm.value = false
    const { data } = await client.from('profiles').select('*')
    if (data) {
      graduates.value = data
        .filter((p: Profile) => p.graduation_set && ['2022', '2023', '2024', '2025', '2026'].includes(p.graduation_set))
        .map((p: Profile) => ({
          id: p.id,
          name: p.full_name,
          set: p.graduation_set,
          profession: p.profession || '',
          location: p.city || '',
          phone: p.whatsapp_number || ''
        }))
    }
  }
}

const confirmDelete = (id: string) => {
  confirmDeleteId.value = id
  confirmDeleteOpen.value = true
}

const deleteItem = async (id: string) => {
  confirmDeleteOpen.value = false
  confirmDeleteId.value = null
  const { error } = await client.from('profiles').delete().eq('id', id)
  if (error) {
    errors.general = 'Error deleting: ' + error.message
  } else {
    graduates.value = graduates.value.filter(g => g.id !== id)
  }
}

useSeoMeta({
  title: 'Admin Graduates — SOSA',
  description: 'Manage the graduating student book.',
  ogTitle: 'Admin Graduates — SOSA',
  ogDescription: 'Manage the graduating student book.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/admin/graduates' }
  ]
})
</script>
