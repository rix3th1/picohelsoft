import prisma from '~/lib/prisma'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  try {
    return prisma.employee.delete({ where: { id } })
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
