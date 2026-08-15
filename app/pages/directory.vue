<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Alumni Directory
        </h1>
        <p class="text-gray-600">
          Find and connect with former schoolmates across the globe.
        </p>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <SkeletonCard
          v-for="n in 8"
          :key="n"
        />
      </div>

      <template v-else>
        <div
          v-if="!isAuthenticated"
          class="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm"
        >
          <UBadge
            color="warning"
            variant="subtle"
            label="Login Required"
            class="mb-4"
          />
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Login to access the Alumni Directory
          </h2>
          <p class="text-gray-600 mb-6">
            You must sign in to view alumni profiles and search the directory.
          </p>
          <UButton
            to="/login"
            label="Member Login"
            color="primary"
          />
        </div>

        <template v-else>
          <div class="flex flex-col md:flex-row gap-4 mb-8">
            <UInput
              id="directory-search"
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              placeholder="Search by name or profession..."
              class="flex-1 w-full"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
            <USelect
              id="directory-set"
              v-model="selectedSet"
              :options="graduatingSets"
              class="w-full md:w-48"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
            <UInput
              id="directory-year"
              v-model="searchYear"
              icon="i-heroicons-calendar"
              placeholder="Filter by year..."
              class="w-full md:w-40"
              :ui="{ base: 'bg-white text-gray-900 w-full' }"
            />
          </div>

          <div
            v-if="filteredAlumni.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AlumniCard
              v-for="alumnus in filteredAlumni"
              :key="alumnus.id"
              :name="alumnus.name"
              :set="alumnus.set"
              :profession="alumnus.profession"
              :location="alumnus.location"
              :phone="alumnus.phone"
            />
          </div>
          <UEmpty
            v-else
            description="No alumni match your search criteria."
          />
        </template>
      </template>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import type { Profile, DirectoryAlumnus } from '~/types/database.types'
import AlumniCard from '~/components/AlumniCard.vue'
import SkeletonCard from '~/components/SkeletonCard.vue'

const client = useSupabaseClient()
const user = useSupabaseUser()
const alumniList = ref<DirectoryAlumnus[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedSet = ref('All')
const searchYear = ref('')

const fetchAlumni = async () => {
  try {
    const { data, error } = await client.from('public_profiles').select('*')
    if (error) {
      console.error('Error fetching alumni:', error)
      return
    }
    if (data) {
      alumniList.value = data.map((p: Profile) => ({
        id: p.id,
        name: p.full_name,
        set: p.graduation_set,
        profession: p.profession || '',
        location: p.city || '',
        phone: p.whatsapp_number || ''
      }))
    }
  } catch (error) {
    console.error('Error fetching alumni:', error)
  }
}

watch(user, async (value) => {
  if (!value) {
    alumniList.value = []
    loading.value = false
    return
  }
  loading.value = true
  await fetchAlumni()
  loading.value = false
}, { immediate: true })

const filteredAlumni = computed(() => {
  return alumniList.value.filter((alumnus) => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || alumnus.profession.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSet = selectedSet.value === 'All' || alumnus.set === selectedSet.value
    const matchesYear = !searchYear.value || alumnus.set.includes(searchYear.value)
    return matchesSearch && matchesSet && matchesYear
  })
})

const graduatingSets = computed(() => {
  const sets = new Set(alumniList.value.map(a => a.set))
  return ['All', ...Array.from(sets).sort()]
})

const isAuthenticated = computed(() => !!user.value)

useSeoMeta({
  title: 'Alumni Directory — SOSA',
  description: 'Find and connect with former schoolmates across the globe.',
  ogTitle: 'Alumni Directory — SOSA',
  ogDescription: 'Find and connect with former schoolmates across the globe.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/directory' }
  ]
})
</script>
