<script setup>
</script>

<template>
  <div class="relative bg-white border-b border-gray-100 py-20 lg:py-28">
    <UContainer>
      <div class="text-center max-w-3xl mx-auto">
        <UBadge
          color="primary"
          variant="subtle"
          label="Official Alumni Network"
          class="mb-4"
        />
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          <slot name="title">
            Welcome Home, Old Students!
          </slot>
        </h1>
        <p
          v-if="$slots.subtitle"
          class="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          <slot name="subtitle" />
        </p>
        <slot name="actions" />
      </div>
    </UContainer>
  </div>
</template>
