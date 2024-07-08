declare namespace NodeJS {
  interface ProcessEnv {
    NUXT_NEXTAUTH_URL?: string
    NUXT_NEXTAUTH_SECRET?: string
    DATABASE_URL?: string
    ADMIN_USERNAME?: string
    ADMIN_PASSWORD?: string
    ADMIN_RESTRICTED_ACCESS_KEY?: string
  }
}
