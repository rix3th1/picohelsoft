import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from '@auth/core/providers/credentials'
import type { AuthConfig, User } from '@auth/core/types'
import argon2 from 'argon2'
import prisma from '~/lib/prisma'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  theme: {
    colorScheme: 'dark',
    logo: '/logo.png'
  },
  pages: {
    signIn: '/'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
          autofocus: true
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password'
        }
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          return null
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { username: credentials.username as string }
          })

          if (!existingUser) return null

          const passwordMatches = await argon2.verify(
            existingUser.hashedPassword,
            credentials.password as string
          )

          if (!passwordMatches) return null

          const { hashedPassword, ...user } = existingUser
          return user
        } catch (error) {
          if (error instanceof Error) {
            console.error({ error })
          }
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as User
      }
      return session
    }
  }
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
