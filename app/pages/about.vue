<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer class="max-w-5xl">
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
        <UBadge
          color="primary"
          variant="subtle"
          label="About Our Association"
          class="mb-3"
        />
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
          Startwell Old Student Association
        </h1>
        <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
          The Startwell Old Student Association (SOSA) is the official alumni network of Start-Well Huffadh College. Founded on July 30, 2023, our mission is to foster lifelong bonds among alumni, preserve our heritage, and give back to our alma mater.
        </p>
      </div>

      <div class="mb-12">
        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Our Motto
            </h2>
          </template>
          <div class="text-center py-4">
            <p class="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary-700 mb-3 sm:mb-4">
              "Aspire, Acquire, and Achieve"
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <p class="font-bold text-gray-900 mb-1">
                  Aspire
                </p>
                <p>To become more than the world expects, dare to dream boldly.</p>
              </div>
              <div>
                <p class="font-bold text-gray-900 mb-1">
                  Acquire
                </p>
                <p>The wisdom, skills, and values that will sustain you beyond titles and positions.</p>
              </div>
              <div>
                <p class="font-bold text-gray-900 mb-1">
                  Achieve
                </p>
                <p>Not just success, but significance — make your mark in ways that uplift others too.</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Association History
            </h2>
          </template>
          <div class="space-y-3 sm:space-y-4 text-sm text-gray-600">
            <div class="flex justify-between border-b border-gray-100 pb-2">
              <span class="font-medium text-gray-900">Founded On</span>
              <span>{{ site.foundedOn }}</span>
            </div>
            <div class="flex justify-between border-b border-gray-100 pb-2">
              <span class="font-medium text-gray-900">Founder</span>
              <span>{{ site.founder }}</span>
            </div>
            <div class="flex justify-between border-b border-gray-100 pb-2">
              <span class="font-medium text-gray-900">Name Given By</span>
              <span>{{ site.nameGivenBy }}</span>
            </div>
            <div class="flex justify-between border-b border-gray-100 pb-2">
              <span class="font-medium text-gray-900">Alma Mater</span>
              <span>{{ site.schoolName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-900">Admin Tenure</span>
              <span>{{ site.administrationTenure }}</span>
            </div>
          </div>
        </UCard>

        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Key Activities & Programs
            </h2>
          </template>
          <ul class="text-xs sm:text-sm text-gray-700 space-y-2">
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-600 mt-0.5"
              />
              <span>Ramadan Iftar programs</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-600 mt-0.5"
              />
              <span>Graduation gifts and support for graduating classes</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-600 mt-0.5"
              />
              <span>Monthly contributions and financial support</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-600 mt-0.5"
              />
              <span>Regular meetings, networking, and mentorship programs</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-600 mt-0.5"
              />
              <span>Social and periodic alumni outreach events</span>
            </li>
          </ul>
        </UCard>
      </div>

      <div class="mb-10 sm:mb-12">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          School Locations
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <UCard class="bg-white text-gray-900 border border-gray-200">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-primary-600"
                />
                <h3 class="font-bold text-base sm:text-lg text-gray-900">
                  Campus 1
                </h3>
              </div>
            </template>
            <p class="text-gray-600 text-xs sm:text-sm">
              {{ site.address }}
            </p>
          </UCard>

          <UCard class="bg-white text-gray-900 border border-gray-200">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-primary-600"
                />
                <h3 class="font-bold text-base sm:text-lg text-gray-900">
                  Campus 2
                </h3>
              </div>
            </template>
            <p class="text-gray-600 text-xs sm:text-sm">
              {{ site.address2 }}
            </p>
          </UCard>
        </div>
      </div>

      <div class="text-center">
        <UCard class="bg-primary-50 border-primary-100 text-gray-900">
          <template #header>
            <h3 class="font-bold text-lg text-primary-900">
              Join the Alumni Network
            </h3>
          </template>
          <p class="text-gray-600 text-sm mb-4">
            Be part of a growing community of trailblazers who live by our motto: <strong>Aspire, Acquire, and Achieve.</strong> Whether you are a recent graduate or an alumnus of many years, there is a place for you in SOSA.
          </p>
          <UButton
            to="/register"
            color="primary"
            label="Register Now"
          />
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'About — Startwell Old Student Association',
  description: 'Learn about the Startwell Old Student Association (SOSA): our motto, history, founder, and key programs.',
  ogTitle: 'About — SOSA Network',
  ogDescription: 'Learn about SOSA: our motto, history, founder, and key programs.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/about' }
  ]
})
</script>
