import argon2 from 'argon2'
import JWT from 'jsonwebtoken'
import prisma from '~/lib/prisma'
import { SignInPayload } from '~/store/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<SignInPayload>(event)

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: {
        username: body.username
      }
    })

    const passwordMatches = await argon2.verify(
      existingUser.hashedPassword,
      body.password
    )

    if (!passwordMatches) {
      throw new Error()
    }

    const { hashedPassword, ...payload } = existingUser

    const runtimeConfig = useRuntimeConfig()
    const SESSION_EXPIRATION_TIME = 10 * 60 * 60 * 24 * 7 // 1 week

    const jwt = JWT.sign(payload, runtimeConfig.admin.password, {
      expiresIn: SESSION_EXPIRATION_TIME
    })

    return {
      jwt,
      user: payload
    }
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})
