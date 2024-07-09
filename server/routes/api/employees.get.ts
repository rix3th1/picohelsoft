import prisma from '~/lib/prisma'

export default defineEventHandler(() => {
  return prisma.employee.findMany()
})
