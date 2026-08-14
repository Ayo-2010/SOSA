<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-6xl">
      <div class="text-center mb-10">
        <UBadge
          color="primary"
          variant="subtle"
          label="Yearbook"
          class="mb-3"
        />
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Graduating Student Book
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Meet the graduating classes of 2022, 2023, 2024, 2025, and 2026. Connect with future leaders of our community.
        </p>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <SkeletonCard
          v-for="n in 8"
          :key="n"
        />
      </div>

      <div v-else>
        <div class="flex flex-wrap gap-3 mb-8 justify-center">
          <UButton
            v-for="set in graduatingSets"
            :key="set"
            :variant="selectedSet === set ? 'solid' : 'outline'"
            :color="selectedSet === set ? 'primary' : 'neutral'"
            :label="set"
            @click="selectedSet = set"
          />
        </div>

        <div
          v-if="filteredGraduates.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AlumniCard
            v-for="alumnus in filteredGraduates"
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
          description="No graduates found for this set."
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DirectoryAlumnus } from '~/types/database.types'
import AlumniCard from '~/components/AlumniCard.vue'
import SkeletonCard from '~/components/SkeletonCard.vue'

const client = useSupabaseClient()
const graduates = ref<DirectoryAlumnus[]>([])
const loading = ref(true)
const selectedSet = ref('2026')

const graduatingSets = ['2022', '2023', '2024', '2025', '2026']

const filteredGraduates = computed(() => {
  return graduates.value.filter(g => g.set === selectedSet.value)
})

onMounted(async () => {
  try {
    const { data, error } = await client.from('public_profiles').select('*')
    if (error) {
      console.error('Error fetching graduates:', error)
      return
    }
    if (data) {
      graduates.value = data
        .filter(p => p.graduation_set && ['2022', '2023', '2024', '2025', '2026'].includes(p.graduation_set))
        .map(p => ({
          id: p.id,
          name: p.full_name,
          set: p.graduation_set,
          profession: p.profession || '',
          location: p.city || '',
          phone: p.whatsapp_number || ''
        }))
    }
  } catch (error) {
    console.error('Error fetching graduates:', error)
  } finally {
    loading.value = false
  }
})

useSeoMeta({
  title: 'Graduating Student Book — SOSA Network',
  description: 'View the graduating student book for the classes of 2022, 2023, 2024, 2025, and 2026.',
  ogTitle: 'Graduating Student Book — SOSA Network',
  ogDescription: 'Meet the graduating classes of 2022 through 2026.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/graduates' }
  ]
})
</script>
