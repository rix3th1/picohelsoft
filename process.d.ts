declare namespace NodeJS {
  interface ProcessEnv {
    NUXT_NEXTAUTH_URL?: string
    NUXT_NEXTAUTH_SECRET?: string
    NUXT_GITHUB_CLIENT_ID?: string
    NUXT_GITHUB_CLIENT_SECRET?: string
  }
}
