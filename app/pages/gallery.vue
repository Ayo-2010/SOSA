<script setup lang="ts">
import { ref, computed } from 'vue'
import { galleryImages, galleryCategories } from '~/data/gallery'

const activeTab = ref('All')

const filteredImages = computed(() => {
  if (activeTab.value === 'All') return galleryImages
  return galleryImages.filter(img => img.category === activeTab.value)
})

useSeoMeta({
  title: 'Photo Gallery — SOSA Network',
  description: 'Explore memories from past events, campus milestones, and alumni reunions.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer>
      <div class="text-center max-w-2xl mx-auto mb-10">
        <UBadge
          color="primary"
          variant="subtle"
          label="Memory Lane"
          class="mb-3"
        />
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          School Archive & Photo Gallery
        </h1>
        <p class="text-gray-600">
          Relive the golden days through our digital collection of historical yearbooks, sports trophies, and past homecoming memories.
        </p>
      </div>

      <div class="flex justify-center gap-2 mb-10 flex-wrap">
        <UButton
          v-for="category in galleryCategories"
          :key="category"
          :variant="activeTab === category ? 'solid' : 'outline'"
          :color="activeTab === category ? 'primary' : 'neutral'"
          :label="category"
          @click="activeTab = category"
        />
      </div>

      <div
        v-if="filteredImages.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <UCard
          v-for="image in filteredImages"
          :key="image.id"
          class="overflow-hidden p-0 bg-white text-gray-900 border border-gray-200"
        >
          <div
            class="h-48 overflow-hidden bg-gray-100 flex items-center justify-center"
            :class="image.color"
          >
            <UIcon
              name="i-heroicons-photo"
              class="w-12 h-12 text-gray-400"
            />
          </div>

          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-lg text-gray-900">
                {{ image.title }}
              </h3>
              <UBadge
                color="primary"
                variant="subtle"
                size="xs"
              >
                {{ image.year }}
              </UBadge>
            </div>
            <p class="text-gray-600 text-sm mb-4">
              {{ image.category }}
            </p>
            <UButton
              variant="ghost"
              size="xs"
              icon="i-heroicons-eye"
              label="View Full Image"
            />
          </div>
        </UCard>
      </div>
      <UEmpty
        v-else
        description="No images found in this category."
      />
    </UContainer>
  </div>
</template>
