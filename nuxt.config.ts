// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
  ],

  imports: {
    autoImport: true
  },

  devtools: {
    enabled: true
  },

  app: {
    head: {
      title: 'SOSA - Start-Well Old Students Association',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://sosa-ruddy.vercel.app',
      siteName: 'SOSA',
      siteDescription: 'School Old Students Association — Bridging generations of excellence through community, networking, and giving back.',
      membershipDues: {
        amount: '500',
        currency: 'NGN',
        period: 'month',
        accountName: 'Startwell Old Student Association',
        accountNumber: '0123456789',
        bankName: 'First Bank of Nigeria'
      },
      whatsappNumber: '07045033528',
      paypalUrl: 'https://www.paypal.com/donate'
    },
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/about',
        '/history',
        '/news',
        '/blog',
        '/gallery',
        '/events',
        '/directory',
        '/donate',
        '/register',
        '/login',
        '/sitemap.xml',
        '/robots.txt'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'SOSA - Start-Well Old Students Association',
      short_name: 'SOSA',
      description: 'School Old Students Association — Bridging generations of excellence through community, networking, and giving back.',
      theme_color: '#059669',
      background_color: '#f9fafb',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/'
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/login',
      include: ['/admin*']
    }
  }
})
