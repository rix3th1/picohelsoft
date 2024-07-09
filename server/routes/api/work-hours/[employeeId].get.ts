export default defineEventHandler(async (event) => {
  const employeeId = getRouterParam(event, 'employeeId')

  const workHour = await prisma.workHour.findFirst({
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
})
