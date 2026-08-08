<script setup lang="ts">
const form = ref({
  email: '',
  password: ''
})

const onSubmit = () => {
  alert('Login functionality will be implemented with Supabase authentication.')
}

useSeoMeta({
  title: 'Member Login — SOSA Network',
  description: 'Sign in to access the alumni directory, event registrations, and your profile.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <UContainer class="max-w-xl">
      <UCard class="bg-white text-gray-900 border border-gray-200">
        <template #header>
          <h1 class="text-2xl font-bold text-gray-900">
            Member Login
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Sign in to access the alumni directory, event registrations, and your profile.
          </p>
        </template>

        <form
          class="space-y-4"
          @submit.prevent="onSubmit"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
              class="bg-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              class="bg-white"
            />
          </div>

          <div class="pt-4">
            <UButton
              type="submit"
              block
              color="primary"
              label="Sign In"
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
  </div>
</template>
