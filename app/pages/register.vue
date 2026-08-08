<script setup>
import { ref } from 'vue'
import { membershipDues } from '~/data/homepage'

const form = ref({
  fullName: '',
  graduationYear: '',
  profession: '',
  email: '',
  phone: '',
  set: ''
})

const onSubmit = () => {
  alert('Thank you for registering! Your profile has been submitted.')
}

useSeoMeta({
  title: 'Alumni Registration — SOSA Network',
  description: 'Join the official database and update your professional details.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <UCard class="bg-white text-gray-900 border border-gray-200">
            <template #header>
              <h1 class="text-2xl font-bold text-gray-900">
                Alumni Registration
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                Join the official database and update your professional details.
              </p>
            </template>

            <form
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
              @submit.prevent="onSubmit"
            >
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <UInput
                  v-model="form.fullName"
                  placeholder="e.g., John Doe"
                  required
                  class="bg-white text-gray-900"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Graduation Year / Set</label>
                <UInput
                  v-model="form.graduationYear"
                  placeholder="e.g., 2012"
                  required
                  class="bg-white text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Current Profession</label>
                <UInput
                  v-model="form.profession"
                  placeholder="e.g., Accountant"
                  class="bg-white text-gray-900"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  class="bg-white text-gray-900"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <UInput
                  v-model="form.phone"
                  placeholder="+123 456 7890"
                  class="bg-white text-gray-900"
                />
              </div>

              <div class="md:col-span-2 pt-4">
                <UButton
                  type="submit"
                  block
                  color="primary"
                  label="Submit Registration"
                />
              </div>
            </form>
          </UCard>
        </div>

        <div class="space-y-6">
          <PaymentCard :dues="membershipDues" />

          <UCard class="bg-blue-50 border-blue-100 text-gray-900">
            <template #header>
              <h3 class="font-bold text-lg text-blue-900">
                Membership Benefits
              </h3>
            </template>
            <ul class="text-sm text-gray-700 space-y-2">
              <li class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-green-600 mt-0.5"
                />
                <span>Access to the alumni directory</span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-green-600 mt-0.5"
                />
                <span>Early event registration</span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-green-600 mt-0.5"
                />
                <span>Networking opportunities</span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-green-600 mt-0.5"
                />
                <span>Monthly newsletter</span>
              </li>
            </ul>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
