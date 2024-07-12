import { SecurityPin } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<SecurityPin>(event)

    const newSecurityPin = await prisma.securityPin.create({
      data: { ...body }
    })

    return newSecurityPin
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
