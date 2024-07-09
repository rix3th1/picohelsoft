import { Employee } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Employee>(event)

  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data: { ...body }
  })

  return updatedEmployee
})
