import { WorkHour } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkHour>(event)

    const newWorkHourEmployee = await prisma.workHour.create({
      data: {
        ...body,
        startTime: new Date(body.startTime),
        ...(body.endTime && {
          endTime: new Date(body.endTime)
        })
      }
    })

    return newWorkHourEmployee
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
