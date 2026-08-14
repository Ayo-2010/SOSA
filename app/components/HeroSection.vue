<template>
  <div class="relative bg-[url('/images/school.png')] bg-cover bg-center bg-no-repeat border-b border-gray-100 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32">
    <div class="absolute inset-0 bg-black/50" />
    <UContainer class="relative z-10">
      <div class="text-center max-w-3xl mx-auto">
        <UBadge
          color="neutral"
          variant="subtle"
          label="Official Alumni Network"
          class="mb-3 sm:mb-4"
        />
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6">
          <slot name="title">
            Welcome Home, Old Students!
          </slot>
        </h1>
        <p
          v-if="$slots.subtitle"
          class="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
        >
          <slot name="subtitle" />
        </p>
        <slot name="actions" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">

</script>
