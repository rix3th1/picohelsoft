import { NuxtAuthHandler } from '#auth'
import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core/types'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  theme: {
    colorScheme: 'dark',
    logo: '/logo.png'
  },
  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret
    })
  ]
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
