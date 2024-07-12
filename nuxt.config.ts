// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  runtimeConfig: {
    admin: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      restrictedAccessKey: process.env.ADMIN_RESTRICTED_ACCESS_KEY,
      settlementValuePerHour: process.env.SETTLEMENT_VALUE_PER_HOUR
    },
    webauthn: {
      rpName: 'Picohelsoft',
      rpID: new URL(process.env.BASE_URL!).hostname,
      origin: process.env.BASE_URL
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    }
  },
  compatibilityDate: '2024-07-06'
})
