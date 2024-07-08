// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  devtools: { enabled: true },
  modules: ['@prisma/nuxt', '@nuxt/ui', '@hebilicious/authjs-nuxt'],
  alias: {
    cookie: 'cookie'
  },
  authJs: {
    guestRedirectTo: '/'
  },
  nitro: {
    routeRules: {
      '/dashboard': { ssr: true, prerender: true }
    }
  },
  runtimeConfig: {
    authJs: { secret: process.env.NUXT_NEXTAUTH_SECRET },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL,
        verifyClientOnEveryRequest: true
      }
    }
  },
  compatibilityDate: '2024-07-06'
})
