import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const pin = getRouterParam(event, 'pin')

    const securityPin = await prisma.securityPin.findFirst({
      where: { pin }
    })

    return {
      verified: securityPin?.pin === pin
    }
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
