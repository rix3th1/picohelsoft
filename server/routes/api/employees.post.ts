import { Employee } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body = await readBody<Employee>(event)

  const newEmployee = await prisma.employee.create({
    data: { ...body }
  })

  return newEmployee
})
