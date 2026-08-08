<script setup>
import { stats, latestNews, membershipDues } from '~/data/homepage'
import { events } from '~/data/events'
import HeroSection from '~/components/HeroSection.vue'
import StatsSection from '~/components/StatsSection.vue'
import EventCard from '~/components/EventCard.vue'
import NewsCard from '~/components/NewsCard.vue'

const upcomingEvent = events.find(e => e.featured) || events[0]

useSeoMeta({
  title: 'SOSA Network — School Old Students Association',
  description: 'Reconnect with old classmates, stay updated on school milestones, and never miss out on upcoming reunions, mentorship programs, and networking events.'
})
</script>

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
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            icon="i-heroicons-calendar"
            size="lg"
            label="View Events"
            to="/events"
          />
          <UButton
            icon="i-heroicons-chat-bubble-left-right"
            size="lg"
            color="emerald"
            variant="solid"
            label="Join WhatsApp Group"
            to="https://chat.whatsapp.com/YOUR_GROUP_LINK_HERE"
            target="_blank"
          />
          <UButton
            icon="i-heroicons-user-plus"
            size="lg"
            variant="outline"
            label="Register / Update Info"
            to="/register"
          />
        </div>
      </template>
    </HeroSection>

    <StatsSection :stats="stats" />

    <div class="py-16 bg-gray-50">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge
              color="primary"
              variant="subtle"
              label="Our Motto"
              class="mb-3"
            />
            <h2 class="text-3xl font-extrabold text-gray-900 mb-4">
              Aspire, Acquire, and Achieve
            </h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
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

          <div class="grid grid-cols-2 gap-4">
            <UCard class="bg-white text-gray-900 border border-gray-200">
              <UIcon
                name="i-heroicons-building-library"
                class="w-8 h-8 text-primary-600 mb-2"
              />
              <h4 class="font-bold text-gray-900">
                Established 2023
              </h4>
              <p class="text-xs text-gray-500">
                Founded July 30, 2023.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200">
              <UIcon
                name="i-heroicons-user-group"
                class="w-8 h-8 text-primary-600 mb-2"
              />
              <h4 class="font-bold text-gray-900">
                64+ Alumni
              </h4>
              <p class="text-xs text-gray-500">
                Growing network of trailblazers.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200">
              <UIcon
                name="i-heroicons-academic-cap"
                class="w-8 h-8 text-primary-600 mb-2"
              />
              <h4 class="font-bold text-gray-900">
                Class of 25
              </h4>
              <p class="text-xs text-gray-500">
                Graduated July 27, 2025.
              </p>
            </UCard>
            <UCard class="bg-white text-gray-900 border border-gray-200">
              <UIcon
                name="i-heroicons-globe-alt"
                class="w-8 h-8 text-primary-600 mb-2"
              />
              <h4 class="font-bold text-gray-900">
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

    <UContainer class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold text-gray-900">
                Next Big Event
              </h2>
              <UButton
                variant="link"
                label="View all events →"
                to="/events"
              />
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <EventCard
                :event="upcomingEvent"
                featured
              />
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Latest School & Alumni News
            </h2>
            <div class="space-y-4">
              <NewsCard
                v-for="news in latestNews"
                :key="news.id"
                :title="news.title"
                :date="news.date"
                :excerpt="news.excerpt"
              />
            </div>
          </div>
        </div>

        <div class="space-y-6">
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
