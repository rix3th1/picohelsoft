// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@hebilicious/authjs-nuxt'],
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
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL,
        verifyClientOnEveryRequest: true
      }
    }
  },
  compatibilityDate: '2024-07-06'
})
