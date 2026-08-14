<template>
  <footer class="bg-primary-900 text-white py-8 sm:py-10 md:py-12 border-t border-primary-800">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div>
          <div class="flex items-center gap-1.5 sm:gap-2 font-bold text-base sm:text-lg text-primary-200 mb-3 sm:mb-4">
            <UIcon
              name="i-heroicons-academic-cap"
              class="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span>{{ site.fullName }}</span>
          </div>
          <p class="text-primary-300 text-xs sm:text-sm leading-relaxed">
            {{ site.tagline }}
          </p>
        </div>

        <div>
          <h4 class="font-bold text-xs sm:text-sm uppercase tracking-wider text-primary-200 mb-3 sm:mb-4">
            Quick Links
          </h4>
          <ul class="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-primary-300">
            <li
              v-for="link in footerLinks"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="hover:text-white transition-colors"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-xs sm:text-sm uppercase tracking-wider text-primary-200 mb-3 sm:mb-4">
            School Locations
          </h4>
          <p class="text-primary-300 text-xs sm:text-sm mb-1.5 sm:mb-2">
            {{ site.address }}
          </p>
          <p class="text-primary-300 text-xs sm:text-sm">
            {{ site.address2 }}
          </p>
        </div>
      </div>

      <div class="border-t border-primary-800 pt-4 sm:pt-6 text-center text-xs text-primary-400">
        {{ site.copyright.replace('{year}', currentYear.toString()) }}
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { site, footerLinks } from '~/data/site'

const currentYear = new Date().getFullYear()
</script>
