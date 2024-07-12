import { Employee } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    const body = await readBody<Employee>(event)

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: { ...body }
    })

    return updatedEmployee
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
