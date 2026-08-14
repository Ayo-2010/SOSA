<template>
  <UCard class="border-l-4 border-primary-500 bg-primary-50 text-gray-900">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-banknotes"
          class="w-5 h-5 text-primary-600"
        />
        <h3 class="font-bold text-base sm:text-lg md:text-xl text-gray-900">
          Monthly Membership Dues
        </h3>
      </div>
    </template>

    <div class="text-center mb-3 sm:mb-4">
      <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-700">
        {{ props.dues.currency }} {{ props.dues.amount }}
      </div>
      <div class="text-xs sm:text-sm text-gray-500 mt-1">
        per {{ props.dues.period }}
      </div>
    </div>

    <div class="bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-sm">
      <div class="flex flex-wrap justify-between gap-x-4 gap-y-1">
        <span class="text-gray-500">Bank</span>
        <span class="font-medium text-gray-900 text-right">{{ props.dues.bankName }}</span>
      </div>
      <div class="flex flex-wrap justify-between gap-x-4 gap-y-1">
        <span class="text-gray-500">Account Name</span>
        <span class="font-medium text-gray-900 text-right">{{ props.dues.accountName }}</span>
      </div>
      <div class="flex flex-wrap justify-between gap-x-4 gap-y-1">
        <span class="text-gray-500">Account Number</span>
        <span class="font-mono font-bold text-primary-700">{{ props.dues.accountNumber }}</span>
      </div>
    </div>

    <template #footer>
      <UButton
        block
        variant="outline"
        size="sm"
        icon="i-heroicons-clipboard-document"
        :label="copied ? 'Copied!' : 'Copy Account Details'"
        :color="copied ? 'success' : 'neutral'"
        @click="copyDetails"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useClipboard } from '~/composables/useClipboard'

interface DuesInfo {
  amount: string
  currency: string
  period: string
  accountName: string
  accountNumber: string
  bankName: string
}

const props = defineProps<{
  dues: DuesInfo
}>()

const { copied, copyText } = useClipboard()

const copyDetails = () => {
  const text = `${props.dues.bankName}\n${props.dues.accountName}\n${props.dues.accountNumber}\nAmount: ${props.dues.currency} ${props.dues.amount}`
  copyText(text)
}
</script>
