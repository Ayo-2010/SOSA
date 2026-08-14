<template>
  <UContainer class="max-w-xl py-8 sm:py-10 lg:py-12">
    <UCard class="bg-white text-gray-900 border border-gray-200 shadow-sm">
      <template #header>
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Member Login
        </h1>
        <p class="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
          Sign in to access the alumni directory, event registrations, and your profile.
        </p>
      </template>

      <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            for="login-email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Email Address</label>
          <UInput
            id="login-email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'login-email-error' : undefined"
          />
          <p
            v-if="errors.email"
            id="login-email-error"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            for="login-password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Password</label>
          <UInput
            id="login-password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
            :aria-invalid="!!errors.password"
            :aria-describedby="errors.password ? 'login-password-error' : undefined"
          />
          <p
            v-if="errors.password"
            id="login-password-error"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            {{ errors.password }}
          </p>
        </div>

        <div
          v-if="errors.general"
          class="p-3 rounded-lg bg-red-50 text-red-700 text-sm"
          role="alert"
        >
          {{ errors.general }}
        </div>

        <div class="pt-4">
          <UButton
            type="submit"
            block
            color="primary"
            label="Sign In"
            :loading="loading"
          />
        </div>

        <p class="text-center text-sm text-gray-500">
          Not a member yet? <NuxtLink
            to="/register"
            class="text-primary-600 hover:underline"
          >Register here</NuxtLink>
        </p>
      </form>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validateEmail, validatePassword } from '~/composables/useValidation'

const client = useSupabaseClient()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const loading = ref(false)

const onSubmit = async () => {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  const emailError = validateEmail(form.email)
  if (emailError) {
    errors.email = emailError
    return
  }

  const passwordError = validatePassword(form.password)
  if (passwordError) {
    errors.password = passwordError
    return
  }

  loading.value = true

  const { data, error } = await client.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  loading.value = false

  if (error) {
    errors.general = error.message === 'Invalid login credentials'
      ? 'Invalid email or password'
      : error.message
    return
  }

  if (data.user) {
    router.push('/')
  }
}

useSeoMeta({
  title: 'Member Login — SOSA Network',
  description: 'Sign in to access the alumni directory, event registrations, and your profile.',
  ogTitle: 'Member Login — SOSA Network',
  ogDescription: 'Sign in to access the alumni directory, event registrations, and your profile.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-network.org/login' }
  ]
})
</script>
