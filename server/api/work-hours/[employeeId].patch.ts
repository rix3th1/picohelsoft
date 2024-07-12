import { WorkHour } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'employeeId')

  try {
    const body = await readBody<WorkHour>(event)

    const updatedWorkHour = await prisma.workHour.update({
      where: { id },
      data: { ...body }
    })

    if (updatedWorkHour.hoursWorked === 0) {
      const ms =
        new Date(updatedWorkHour.endTime!).getTime() -
        new Date(updatedWorkHour.startTime).getTime()
      const hoursWorked = Math.round(ms / (1000 * 60 * 60))

      return await prisma.workHour.update({
        where: { id },
        data: {
          hoursWorked
        }
      })
    }

    return updatedWorkHour
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
