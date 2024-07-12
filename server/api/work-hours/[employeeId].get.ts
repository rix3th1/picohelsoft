import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const employeeId = getRouterParam(event, 'employeeId')

  try {
    const workHour = await prisma.workHour.findFirstOrThrow({
      where: {
        startTime: {
          lte: new Date()
        },
        employeeId: employeeId
      },
      include: {
        employee: {
          include: {
            location: true
          }
        }
      }
    })

    return workHour
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
