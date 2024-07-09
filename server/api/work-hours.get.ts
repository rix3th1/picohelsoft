import prisma from '~/lib/prisma'

export default defineEventHandler(() => {
  return prisma.workHour.findMany({
    include: {
      employee: {
        include: {
          location: true
        }
      }
    }
  })
})
