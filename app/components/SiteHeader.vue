<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
    <UContainer class="flex h-14 items-center justify-between gap-3 sm:h-16">
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center gap-2"
      >
        <UIcon
          name="i-heroicons-academic-cap"
          class="h-6 w-6 sm:h-7 sm:w-7 text-primary-600"
        />
        <span class=" font-bold text-base text-gray-900 tracking-tight sm:inline sm:text-lg">
          SOSA
        </span>
      </NuxtLink>

      <nav
        class="hidden flex-1 items-center justify-center gap-1 md:flex max-[900px]:gap-0.5 max-[865px]:gap-0"
        aria-label="Main navigation"
      >
        <template
          v-for="link in links.links"
          :key="link.to || link.label"
        >
          <div
            v-if="link.children"
            class="relative group"
          >
            <button
              class="relative px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ link.label }}
              <UIcon
                name="i-heroicons-chevron-down"
                class="ml-1 h-3 w-3 inline-block"
              />
            </button>
            <div class="absolute left-0 top-full -mt-[10px] hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50">
              <NuxtLink
                v-for="child in link.children"
                :key="child.to"
                :to="child.to"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                active-class="text-primary-600 bg-gray-50"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="link.to"
            class="relative px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            active-class="text-gray-900"
          >
            {{ link.label }}
            <span
              v-if="$route.path === link.to"
              class="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary-600"
            />
          </NuxtLink>
        </template>
      </nav>

      <div class="flex shrink-0 items-center gap-2 sm:gap-3">
        <slot name="actions">
          <UButton
            label="Member Login"
            variant="outline"
            size="sm"
            to="/login"
            class="hidden sm:inline-flex"
          />
          <UButton
            icon="i-heroicons-user"
            variant="outline"
            size="sm"
            to="/login"
            class="sm:hidden"
          />
        </slot>
        <UButton
          v-if="isMobile"
          id="mobile-menu-button"
          :icon="open ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          variant="ghost"
          size="sm"
          class="flex h-10 w-10 items-center justify-center rounded-full p-0 transition-all duration-200 md:hidden"
          :class="open ? 'rotate-90 bg-gray-100' : ''"
          :aria-expanded="open"
          aria-controls="mobile-menu-panel"
          :aria-label="open ? 'Close navigation menu' : 'Open navigation menu'"
          @click="toggleMenu"
        />
      </div>
    </UContainer>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobile && open"
        class="fixed inset-x-0 top-14 bottom-0 z-[60] sm:top-16 md:hidden"
      >
        <div
          class="absolute inset-0 bg-black/45"
          @click="closeMenu"
        />
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-full opacity-0"
        >
          <div
            v-if="open"
            ref="mobileMenuPanel"
            class="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-gray-200 bg-gray-50 shadow-2xl"
            style="top: 0;"
            @click.stop
          >
            <nav
              class="flex flex-col gap-1 bg-gray-100 p-3"
              aria-label="Mobile navigation"
            >
              <template
                v-for="link in links.links"
                :key="link.to || link.label"
              >
                <div
                  v-if="link.children"
                  class="flex flex-col gap-1"
                >
                  <div class="px-3 py-2.5 text-sm font-bold text-gray-900">
                    {{ link.label }}
                  </div>
                  <NuxtLink
                    v-for="child in link.children"
                    :key="child.to"
                    :to="child.to"
                    class="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-gray-900 pl-6"
                    active-class="bg-white text-gray-900"
                    @click="closeMenu"
                  >
                    {{ child.label }}
                    <UIcon
                      v-if="$route.path === child.to"
                      name="i-heroicons-check"
                      class="ml-auto h-4 w-4 text-primary-600"
                    />
                  </NuxtLink>
                </div>
                <NuxtLink
                  v-else
                  :to="link.to"
                  class="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-gray-900"
                  active-class="bg-white text-gray-900"
                  @click="closeMenu"
                >
                  {{ link.label }}
                  <UIcon
                    v-if="$route.path === link.to"
                    name="i-heroicons-check"
                    class="ml-auto h-4 w-4 text-primary-600"
                  />
                </NuxtLink>
              </template>
            </nav>
            <div class="mt-auto border-t border-gray-100 bg-gray-100 p-4">
              <slot name="mobile-actions" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const links = defineProps<{
  links: Array<{ label: string, to?: string, children?: Array<{ label: string, to: string }> }>
}>()

const open = ref(false)
const isMobile = ref(false)
const mobileMenuPanel = ref<HTMLElement | null>(null)

const closeMenu = () => {
  open.value = false
}

const toggleMenu = () => {
  open.value = !open.value
}

onClickOutside(mobileMenuPanel, closeMenu)

const updateViewport = () => {
  const mobile = window.innerWidth < 768
  isMobile.value = mobile

  if (!mobile && open.value) {
    open.value = false
  }
}

watch(open, async (newVal) => {
  if (newVal && isMobile.value) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    mobileMenuPanel.value?.querySelector<HTMLElement>('a, button')?.focus()
  } else {
    document.body.style.overflow = ''
  }
})

watch(isMobile, (mobile) => {
  if (!mobile && open.value) {
    open.value = false
  }
})

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('resize', updateViewport)
})
</script>
