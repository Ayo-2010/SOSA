<template>
  <UContainer class="max-w-6xl py-8 sm:py-10 lg:py-12">
    <UCard class="bg-white text-gray-900 border border-gray-200">
      <template #header>
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Update Profile
        </h1>
        <p class="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
          Keep your alumni details current so the community can stay connected.
        </p>
      </template>

      <form
        class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        @submit.prevent="onSubmit"
      >
        <div class="md:col-span-2">
          <label
            for="profile-fullName"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Full Name</label>
          <UInput
            id="profile-fullName"
            v-model="form.fullName"
            placeholder="e.g., John Doe"
            required
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
            :aria-invalid="!!errors.fullName"
            :aria-describedby="errors.fullName ? 'profile-fullName-error' : undefined"
          />
          <p
            v-if="errors.fullName"
            id="profile-fullName-error"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            {{ errors.fullName }}
          </p>
        </div>

        <div>
          <label
            for="profile-graduationYear"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Graduation Year / Set</label>
          <UInput
            id="profile-graduationYear"
            v-model="form.graduationYear"
            placeholder="e.g., 2012"
            required
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
            :aria-invalid="!!errors.graduationYear"
            :aria-describedby="errors.graduationYear ? 'profile-graduationYear-error' : undefined"
          />
          <p
            v-if="errors.graduationYear"
            id="profile-graduationYear-error"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            {{ errors.graduationYear }}
          </p>
        </div>
        <div>
          <label
            for="profile-profession"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Current Profession</label>
          <UInput
            id="profile-profession"
            v-model="form.profession"
            placeholder="e.g., Accountant"
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
          />
        </div>

        <div class="md:col-span-2">
          <label
            for="profile-city"
            class="block text-sm font-medium text-gray-700 mb-1"
          >City</label>
          <UInput
            id="profile-city"
            v-model="form.city"
            placeholder="e.g., Lagos"
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
          />
        </div>

        <div class="md:col-span-2">
          <label
            for="profile-whatsappNumber"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Phone Number</label>
          <UInput
            id="profile-whatsappNumber"
            v-model="form.whatsappNumber"
            placeholder="+123 456 7890"
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
          />
        </div>

        <div class="md:col-span-2">
          <label
            for="profile-bio"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Bio</label>
          <UTextarea
            id="profile-bio"
            v-model="form.bio"
            placeholder="Tell us a bit about yourself..."
            :rows="4"
            class="w-full"
            :ui="{ base: 'bg-white text-gray-900 w-full' }"
          />
        </div>

        <div
          v-if="errors.general"
          class="md:col-span-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm"
          role="alert"
        >
          {{ errors.general }}
        </div>

        <div
          v-if="successMessage"
          class="md:col-span-2 p-3 rounded-lg bg-green-50 text-green-700 text-sm"
          role="status"
        >
          {{ successMessage }}
        </div>

        <div class="md:col-span-2 pt-4">
          <UButton
            type="submit"
            block
            color="primary"
            label="Save Changes"
            :loading="loading"
          />
        </div>
      </form>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { validateRequired } from '~/composables/useValidation'

definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient()
const user = useSupabaseUser()

const form = reactive({
  fullName: '',
  graduationYear: '',
  profession: '',
  city: '',
  whatsappNumber: '',
  bio: ''
})

const errors = reactive({
  fullName: '',
  graduationYear: '',
  general: ''
})

const loading = ref(false)
const successMessage = ref('')

const loadProfile = async () => {
  if (!user.value?.id && !user.value?.sub) return
  const userId = user.value.id || user.value.sub
  const { data } = await client.from('profiles').select('*').eq('id', userId).single()
  if (data) {
    form.fullName = data.full_name || ''
    form.graduationYear = data.graduation_set || ''
    form.profession = data.profession || ''
    form.city = data.city || ''
    form.whatsappNumber = data.whatsapp_number || ''
    form.bio = data.bio || ''
  }
}

watch(user, async () => {
  if (user.value?.id || user.value?.sub) {
    await loadProfile()
  }
})

onMounted(async () => {
  if (user.value?.id || user.value?.sub) {
    await loadProfile()
  }
})

const onSubmit = async () => {
  errors.fullName = ''
  errors.graduationYear = ''
  errors.general = ''
  successMessage.value = ''

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

  loading.value = true

  try {
    const { data: { session } } = await client.auth.getSession()
    if (!session?.access_token) {
      errors.general = 'You must be logged in to update your profile'
      return
    }

    const result = await $fetch<{ success?: boolean, error?: string }>('/api/profile', {
      method: 'PUT',
      body: {
        fullName: form.fullName,
        graduationYear: form.graduationYear,
        profession: form.profession,
        city: form.city,
        whatsappNumber: form.whatsappNumber,
        bio: form.bio
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    if (result.error) {
      errors.general = result.error
      return
    }

    successMessage.value = 'Profile updated successfully!'
    await loadProfile()
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Update Profile — SOSA',
  description: 'Update your alumni profile details.',
  ogTitle: 'Update Profile — SOSA',
  ogDescription: 'Update your alumni profile details.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://sosa-ruddy.vercel.app/profile' }
  ]
})
</script>
