<template>
  <UContainer class="max-w-6xl py-8 sm:py-10 lg:py-12">
    <div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <UCard class="bg-white text-gray-900 border border-gray-200">
          <template #header>
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Alumni Registration
            </h1>
            <p class="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
              Join the official database and update your professional details.
            </p>
          </template>

          <form
            class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            @submit.prevent="onSubmit"
          >
            <div class="md:col-span-2">
              <label
                for="reg-fullName"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Full Name</label>
              <UInput
                id="reg-fullName"
                v-model="form.fullName"
                placeholder="e.g., John Doe"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.fullName"
                :aria-describedby="errors.fullName ? 'reg-fullName-error' : undefined"
              />
              <p
                v-if="errors.fullName"
                id="reg-fullName-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.fullName }}
              </p>
            </div>

            <div>
              <label
                for="reg-graduationYear"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Graduation Year / Set</label>
              <UInput
                id="reg-graduationYear"
                v-model="form.graduationYear"
                placeholder="e.g., 2012"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.graduationYear"
                :aria-describedby="errors.graduationYear ? 'reg-graduationYear-error' : undefined"
              />
              <p
                v-if="errors.graduationYear"
                id="reg-graduationYear-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.graduationYear }}
              </p>
            </div>
            <div>
              <label
                for="reg-profession"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Current Profession</label>
              <UInput
                id="reg-profession"
                v-model="form.profession"
                placeholder="e.g., Accountant"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.profession"
                :aria-describedby="errors.profession ? 'reg-profession-error' : undefined"
              />
              <p
                v-if="errors.profession"
                id="reg-profession-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.profession }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="reg-email"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Email Address</label>
              <UInput
                id="reg-email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'reg-email-error' : undefined"
              />
              <p
                v-if="errors.email"
                id="reg-email-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="reg-phone"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Phone Number</label>
              <UInput
                id="reg-phone"
                v-model="form.phone"
                placeholder="+123 456 7890"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.phone"
                :aria-describedby="errors.phone ? 'reg-phone-error' : undefined"
              />
              <p
                v-if="errors.phone"
                id="reg-phone-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.phone }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="reg-password"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label>
              <UInput
                id="reg-password"
                v-model="form.password"
                type="password"
                placeholder="Min. 6 characters"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.password"
                :aria-describedby="errors.password ? 'reg-password-error' : undefined"
              />
              <p
                v-if="errors.password"
                id="reg-password-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.password }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="reg-confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Confirm Password</label>
              <UInput
                id="reg-confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="Repeat your password"
                required
                class="w-full"
                :ui="{ base: 'bg-white text-gray-900 w-full' }"
                :aria-invalid="!!errors.confirmPassword"
                :aria-describedby="errors.confirmPassword ? 'reg-confirmPassword-error' : undefined"
              />
              <p
                v-if="errors.confirmPassword"
                id="reg-confirmPassword-error"
                class="text-red-500 text-xs mt-1"
                role="alert"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>

            <div
              v-if="errors.general"
              class="md:col-span-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm"
              role="alert"
            >
              {{ errors.general }}
            </div>

            <div class="md:col-span-2 pt-4">
              <UButton
                type="submit"
                block
                color="primary"
                label="Submit Registration"
                :loading="loading"
              />
            </div>
          </form>
        </UCard>
      </div>

      <div class="space-y-4 sm:space-y-6">
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
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validateEmail, validateRequired, validatePassword, validatePasswordMatch } from '~/composables/useValidation'

const runtimeConfig = useRuntimeConfig()
const membershipDues = runtimeConfig.public.membershipDues

const router = useRouter()

const form = reactive({
  fullName: '',
  graduationYear: '',
  profession: '',
  email: '',
  phone: '',
  set: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  fullName: '',
  graduationYear: '',
  profession: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const loading = ref(false)

const onSubmit = async () => {
  errors.fullName = ''
  errors.graduationYear = ''
  errors.profession = ''
  errors.email = ''
  errors.phone = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.general = ''

  const fullNameError = validateRequired(form.fullName, 'Full name')
  if (fullNameError) {
    errors.fullName = fullNameError
    return
  }

  const graduationYearError = validateRequired(form.graduationYear, 'Graduation year / set')
  if (graduationYearError) {
    errors.graduationYear = graduationYearError
    return
  }

  const professionError = validateRequired(form.profession, 'Current profession')
  if (professionError) {
    errors.profession = professionError
    return
  }

  const emailError = validateEmail(form.email)
  if (emailError) {
    errors.email = emailError
    return
  }

  const phoneError = validateRequired(form.phone, 'Phone number')
  if (phoneError) {
    errors.phone = phoneError
    return
  }

  const passwordError = validatePassword(form.password)
  if (passwordError) {
    errors.password = passwordError
    return
  }

  const confirmPasswordError = validatePasswordMatch(form.password, form.confirmPassword)
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError
    return
  }

  loading.value = true

  const result = await $fetch<{ success?: boolean, error?: string }>('/api/register', {
    method: 'POST',
    body: {
      fullName: form.fullName,
      graduationYear: form.graduationYear,
      profession: form.profession,
      email: form.email,
      phone: form.phone,
      password: form.password
    }
  })

  loading.value = false

  if (result.error) {
    errors.general = result.error
    return
  }

  router.push('/login?registered=true')
}

useSeoMeta({
  title: 'Alumni Registration — SOSA Network',
  description: 'Join the official database and update your professional details.',
  ogTitle: 'Alumni Registration — SOSA Network',
  ogDescription: 'Join the official database and update your professional details.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/register' }
  ]
})
</script>
