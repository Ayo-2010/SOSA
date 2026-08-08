<script setup lang="ts">
import type { Profile, DirectoryAlumnus } from '~/types/database.types'
import AlumniCard from '~/components/AlumniCard.vue'

const client = useSupabaseClient()
const alumniList = ref<DirectoryAlumnus[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedSet = ref('All')

onMounted(async () => {
  const { data } = await client.from('profiles').select('*').order('created_at', { ascending: false })
  if (data) {
    alumniList.value = data.map((p: Profile) => ({
      id: p.id,
      name: p.full_name,
      set: p.graduation_set,
      profession: p.profession || '',
      location: p.city || ''
    }))
  }
  loading.value = false
})

const filteredAlumni = computed(() => {
  return alumniList.value.filter((alumnus) => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || alumnus.profession.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSet = selectedSet.value === 'All' || alumnus.set === selectedSet.value
    return matchesSearch && matchesSet
  })
})

const graduatingSets = computed(() => {
  const sets = new Set(alumniList.value.map(a => a.set))
  return ['All', ...Array.from(sets).sort()]
})

useSeoMeta({
  title: 'Alumni Directory — SOSA Network',
  description: 'Find and connect with former schoolmates across the globe.'
})
</script>

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

      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search by name or profession..."
          class="flex-1 bg-white text-gray-900"
        />
        <USelect
          v-model="selectedSet"
          :options="graduatingSets"
          class="w-full md:w-48 bg-white text-gray-900"
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
        />
      </div>
      <UEmpty
        v-else
        description="No alumni match your search criteria."
      />
    </UContainer>
  </div>
</template>
