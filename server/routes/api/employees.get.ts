export default defineEventHandler(() => {
  return prisma.employee.findMany()
})
