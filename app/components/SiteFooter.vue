<script setup>
import { site, footerLinks } from '~/data/site'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-primary-900 text-white py-12 border-t border-primary-800">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 font-bold text-lg text-primary-200 mb-4">
            <UIcon
              name="i-heroicons-academic-cap"
              class="w-6 h-6"
            />
            <span>{{ site.fullName }}</span>
          </div>
          <p class="text-primary-300 text-sm leading-relaxed">
            {{ site.tagline }}
          </p>
        </div>

        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider text-primary-200 mb-4">
            Quick Links
          </h4>
          <ul class="space-y-2 text-sm text-primary-300">
            <li
              v-for="link in footerLinks"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="hover:text-white"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider text-primary-200 mb-4">
            School Locations
          </h4>
          <p class="text-primary-300 text-sm mb-2">
            {{ site.address }}
          </p>
          <p class="text-primary-300 text-sm">
            {{ site.address2 }}
          </p>
        </div>
      </div>

      <div class="border-t border-primary-800 pt-6 text-center text-xs text-primary-400">
        {{ site.copyright.replace('{year}', currentYear.toString()) }}
      </div>
    </UContainer>
  </footer>
</template>
