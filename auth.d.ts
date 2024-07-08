import '@auth/core/types'
import type { User as UserModel } from '@prisma/client'

declare module '@auth/core/types' {
  interface Session {
    user?: User
  }
  interface User extends UserModel {
    hashedPassword?: string
  }
}
