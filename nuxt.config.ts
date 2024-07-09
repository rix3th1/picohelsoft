// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@hebilicious/authjs-nuxt'],
  alias: {
    cookie: 'cookie'
  },
  authJs: {
    guestRedirectTo: '/',
    authenticatedRedirectTo: '/dashboard'
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
    },
    webauthn: {
      rpName: 'Picohelsoft',
      rpID: new URL(process.env.NUXT_NEXTAUTH_URL!).hostname,
      origin: process.env.NUXT_NEXTAUTH_URL!
    }
  },
  compatibilityDate: '2024-07-06'
})
