import { RestrictedAccessKey } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RestrictedAccessKey>(event)

    const restrictedAccessKey = await prisma.restrictedAccessKey.findFirst({
      where: { key: body.key }
    })

    return {
      verified: restrictedAccessKey?.key === body.key
    }
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
