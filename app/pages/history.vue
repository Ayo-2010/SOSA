<script setup>
const historyMilestones = [
  {
    year: '2023',
    title: 'Establishment of SOSA',
    description: 'Start-Well Old Students Association (SOSA) was officially established on July 30, 2023, by Master Abdulmalik Sanni, with the name given by Fariidat Bawa-Allah. The association was founded to foster lifelong bonds among alumni of Start-Well Huffadh College.',
    icon: 'i-heroicons-building-library'
  },
  {
    year: '2025',
    title: 'Class of 25 Graduation',
    description: 'Celebrated the graduation and induction of the Class of 25 into the alumni network on Sunday, 27th July 2025. The association provided graduation gifts and support to celebrate their achievements.',
    icon: 'i-heroicons-academic-cap'
  },
  {
    year: '2026',
    title: 'Going Digital',
    description: 'Launch of the official SOSA digital web platform to streamline monthly contributions, event planning, and global alumni networking. The platform connects alumni across the globe and preserves the association\'s growing legacy.',
    icon: 'i-heroicons-globe-alt'
  }
]

useSeoMeta({
  title: 'SOSA History — Startwell Old Student Association',
  description: 'Explore the milestones and legacy of the Start-Well Old Students Association (SOSA) from its founding on July 30, 2023 to the present day.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-4xl">
      <div class="text-center mb-16">
        <UBadge
          color="primary"
          variant="subtle"
          label="Our Heritage"
          class="mb-3"
        />
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          History of Our Association
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Take a walk down memory lane and explore the key milestones, achievements, and evolution of the Start-Well Old Students Association (SOSA) from its founding to the present day.
        </p>
      </div>

      <div class="relative border-l-2 border-primary-200 ml-4 md:ml-32 space-y-12">
        <div
          v-for="(item, index) in historyMilestones"
          :key="index"
          class="relative pl-8 md:pl-12"
        >
          <div class="absolute -left-[17px] top-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
            <UIcon
              :name="item.icon"
              class="w-4 h-4"
            />
          </div>

          <div class="md:absolute md:-left-32 md:top-0 md:text-right md:w-24">
            <span class="inline-block bg-primary-100 text-primary-800 font-bold text-sm px-3 py-1 rounded-full mb-2 md:mb-0">
              {{ item.year }}
            </span>
          </div>

          <UCard class="border border-gray-100 bg-white">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ item.description }}
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
