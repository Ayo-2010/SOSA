<template>
  <div class="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
    <UContainer class="max-w-5xl">
      <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <UBadge
          color="primary"
          variant="subtle"
          label="Support Alma Mater"
          class="mb-3"
        />
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Make a Donation
        </h1>
        <p class="text-gray-600 text-sm sm:text-base md:text-lg">
          Your contribution directly funds scholarships, facility upgrades, mentorship programs, and alumni outreach initiatives.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">
              Bank Transfer
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              Send your donation directly to the association account.
            </p>
          </template>

          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Bank</span>
                <span class="font-medium text-gray-900">{{ membershipDues.bankName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Account Name</span>
                <span class="font-medium text-gray-900">{{ membershipDues.accountName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Account Number</span>
                <span class="font-mono font-bold text-primary-700">{{ membershipDues.accountNumber }}</span>
              </div>
            </div>

            <UButton
              block
              variant="outline"
              icon="i-heroicons-clipboard-document"
              :label="copied ? 'Copied!' : 'Copy Account Details'"
              :color="copied ? 'success' : 'neutral'"
              @click="copyDetails"
            />
          </div>
        </UCard>

        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Mobile / Online
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              Donate instantly via your preferred mobile app or online gateway.
            </p>
          </template>

          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-2">
                PayPal / Stripe
              </h3>
              <UButton
                block
                variant="outline"
                icon="i-heroicons-credit-card"
                label="Donate Online"
                :to="paypalUrl"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-2">
                WhatsApp
              </h3>
              <UButton
                block
                variant="outline"
                icon="i-heroicons-chat-bubble-bottom-center-text"
                label="Chat with Treasurer"
                :to="`https://wa.me/${whatsappNumber}`"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </UCard>
      </div>

      <div class="mt-12 text-center">
        <UCard class="bg-primary-50 border-primary-100 text-gray-900">
          <template #header>
            <h3 class="font-bold text-lg text-primary-900">
              Where Your Money Goes
            </h3>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <p class="font-semibold text-gray-900">
                Scholarships
              </p>
              <p class="mt-1">
                Funding tuition for outstanding but underprivileged students.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900">
                Facilities
              </p>
              <p class="mt-1">
                Upgrading labs, libraries, classrooms, and sports equipment.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900">
                Programs
              </p>
              <p class="mt-1">
                Mentorship, career fairs, reunions, and alumni networking.
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '~/composables/useClipboard'

const runtimeConfig = useRuntimeConfig()
const membershipDues = runtimeConfig.public.membershipDues
const whatsappNumber = runtimeConfig.public.whatsappNumber
const paypalUrl = runtimeConfig.public.paypalUrl
const { copied, copyText } = useClipboard()

const copyDetails = () => {
  const text = `${membershipDues.bankName}\n${membershipDues.accountName}\n${membershipDues.accountNumber}\nAmount: ${membershipDues.currency} ${membershipDues.amount}`
  copyText(text)
}

useSeoMeta({
  title: 'Support SOSA — Donate',
  description: 'Contribute to facility upgrades, scholarships, and alumni programs.',
  ogTitle: 'Support SOSA — Donate',
  ogDescription: 'Contribute to facility upgrades, scholarships, and alumni programs.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/donate' }
  ]
})
</script>
