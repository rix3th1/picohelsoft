export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return prisma.employee.delete({ where: { id } })
})
