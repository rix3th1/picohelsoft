import { WorkHour } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
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
})
