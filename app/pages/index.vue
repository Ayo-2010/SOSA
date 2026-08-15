<template>
  <div>
    <HeroSection>
      <template #title>
        Welcome to <span class="text-primary-600">Startwell Old Student Association</span>
      </template>
      <template #subtitle>
        The official alumni network of Start-Well Huffadh College — fostering lifelong bonds, preserving our heritage, and giving back to our alma mater.
      </template>
      <template #actions>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <UButton
            icon="i-heroicons-calendar"
            size="md"
            label="View Events"
            to="/events"
          />
          <template v-if="user">
            <UButton
              icon="i-heroicons-chat-bubble-left-right"
              size="md"
              color="success"
              variant="solid"
              label="Join WhatsApp Group"
              :to="`https://wa.me/${whatsappNumber}`"
              target="_blank"
              rel="noopener noreferrer"
            />
          </template>
          <UButton
            :icon="user ? 'i-heroicons-pencil-square' : 'i-heroicons-user-plus'"
            size="md"
            variant="outline"
            :label="user ? 'Update Profile' : 'Register / Update Info'"
            :to="user ? '/profile' : '/register'"
          />
        </div>
      </template>
    </HeroSection>

    <StatsSection :stats="stats" />

    <div class="py-8 sm:py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge
              color="primary"
              variant="subtle"
              label="Our Motto"
              class="mb-3"
            />
            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Aspire, Acquire, and Achieve
            </h2>
            <p class="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Founded on July 30, 2023 by Master Abdulmalik Sanni, the Startwell Old Student Association (SOSA) brings together alumni of Start-Well Huffadh College. We aspire to become more than the world expects, acquire wisdom and values, and achieve significance that uplifts others.
            </p>
            <UButton
              icon="i-heroicons-book-open"
              label="Explore Full History"
              to="/history"
              color="primary"
              variant="solid"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <UCard class="bg-white text-gray-900 border border-gray-200 p-3 sm:p-4 md:p-5">
              <UIcon
                name="i-heroicons-building-library"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 mb-1.5 sm:mb-2"
              />
              <h4 class="font-bold text-xs sm:text-sm md:text-base text-gray-900">
                Established 2023
              </h4>
              <p class="text-xs text-gray-500">
                Founded July 30, 2023.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200 p-3 sm:p-4 md:p-5">
              <UIcon
                name="i-heroicons-user-group"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 mb-1.5 sm:mb-2"
              />
              <h4 class="font-bold text-xs sm:text-sm md:text-base text-gray-900">
                64+ Alumni
              </h4>
              <p class="text-xs text-gray-500">
                Growing network of trailblazers.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200 p-3 sm:p-4 md:p-5">
              <UIcon
                name="i-heroicons-academic-cap"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 mb-1.5 sm:mb-2"
              />
              <h4 class="font-bold text-xs sm:text-sm md:text-base text-gray-900">
                Class of 26
              </h4>
              <p class="text-xs text-gray-500">
                Graduated July 25, 2026.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200 p-3 sm:p-4 md:p-5">
              <UIcon
                name="i-heroicons-globe-alt"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 mb-1.5 sm:mb-2"
              />
              <h4 class="font-bold text-xs sm:text-sm md:text-base text-gray-900">
                Digital Platform
              </h4>
              <p class="text-xs text-gray-500">
                Connected across generations.
              </p>
            </UCard>
          </div>
        </div>
      </UContainer>
    </div>

    <UContainer class="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div class="lg:col-span-2 space-y-6 sm:space-y-8">
          <div>
            <div class="flex flex-wrap justify-between items-center gap-2 mb-3 sm:mb-4">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Next Big Event
              </h2>
              <UButton
                variant="link"
                label="View all events →"
                to="/events"
              />
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <SkeletonCard
                v-if="eventsLoading"
                image
              />
              <EventCard
                v-else-if="upcomingEvent"
                :event="upcomingEvent"
                featured
                :link="`/events/${upcomingEvent.slug}`"
              />
              <div
                v-else
                class="text-gray-500 text-center py-8"
              >
                No upcoming events.
              </div>
            </div>
          </div>

          <div>
            <div class="flex flex-wrap justify-between items-center gap-2 mb-3 sm:mb-4">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Featured News
              </h2>
              <UButton
                variant="link"
                label="View all news →"
                to="/news"
              />
            </div>
            <div class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
              <SkeletonCard
                v-if="newsLoading"
                image
              />
              <NewsCard
                v-else-if="featuredPost"
                :title="featuredPost.title"
                :date="formatDate(featuredPost.created_at)"
                :excerpt="featuredPost.content.slice(0, 160) + (featuredPost.content.length > 160 ? '...' : '')"
                :link="`/news/${featuredPost.slug}`"
              />
              <div
                v-else
                class="text-gray-500 text-center py-8"
              >
                No featured news yet.
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <PaymentCard :dues="membershipDues" />

          <UCard class="bg-white text-gray-900 border border-gray-200">
            <template #header>
              <h3 class="font-bold text-lg text-gray-900">
                Alumni Directory
              </h3>
            </template>
            <p class="text-gray-600 text-sm mb-4">
              Looking for a long-lost desk mate or a professional contact from your graduating set? Search our secure database.
            </p>
            <UButton
              block
              variant="outline"
              icon="i-heroicons-magnifying-glass"
              label="Search Directory"
              to="/directory"
            />
          </UCard>

          <UCard class="bg-primary-50 border-primary-100 text-gray-900">
            <template #header>
              <h3 class="font-bold text-lg text-primary-900">
                Support Alma Mater
              </h3>
            </template>
            <p class="text-gray-600 text-sm mb-4">
              Give back to the institution that shaped us. Contribute to ongoing facility upgrades and student scholarship funds.
            </p>
            <UButton
              block
              color="primary"
              label="Make a Donation"
              to="/donate"
            />
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Event, AppEvent, Post } from '~/types/database.types'
import { formatDate, formatTime } from '~/composables/useFormatters'
import HeroSection from '~/components/HeroSection.vue'
import StatsSection from '~/components/StatsSection.vue'
import EventCard from '~/components/EventCard.vue'
import NewsCard from '~/components/NewsCard.vue'
import SkeletonCard from '~/components/SkeletonCard.vue'
import { stats } from '~/data/homepage'

const runtimeConfig = useRuntimeConfig()
const membershipDues = runtimeConfig.public.membershipDues
const whatsappNumber = runtimeConfig.public.whatsappNumber

const client = useSupabaseClient()
const user = useSupabaseUser()
const events = ref<AppEvent[]>([])
const eventsLoading = ref(true)
const featuredPost = ref<Post | null>(null)
const newsLoading = ref(true)

onMounted(async () => {
  try {
    const [{ data: eventsData }, { data: postsData }] = await Promise.all([
      client.from('events').select('*').order('event_date', { ascending: true }).limit(1),
      client.from('posts').select('*').eq('featured', true).limit(1).maybeSingle()
    ])

    if (eventsData && eventsData.length) {
      const e = eventsData[0] as Event
      events.value = [{
        ...e,
        date: formatDate(e.event_date),
        time: formatTime(e.event_date),
        featured: e.featured || false,
        past: new Date(e.event_date) < new Date()
      }]
    }
    eventsLoading.value = false

    if (postsData) {
      featuredPost.value = postsData as Post
    }
    newsLoading.value = false
  } catch {
    eventsLoading.value = false
    newsLoading.value = false
  }
})

const upcomingEvent = computed(() => events.value[0])

useSeoMeta({
  title: 'SOSA — School Old Students Association',
  description: 'Reconnect with old classmates, stay updated on school milestones, and never miss out on upcoming reunions, mentorship programs, and networking events.',
  ogTitle: 'SOSA — School Old Students Association',
  ogDescription: 'Reconnect with old classmates, stay updated on school milestones, and never miss out on upcoming reunions, mentorship programs, and networking events.'
})

useHead({
  meta: [
    { name: 'google-site-verification', content: 'OOMrRBi4eYrVRvTFhX1dRDaM3yLq8CgqOV2j4af0etU' }
  ],
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app' }
  ]
})
</script>
