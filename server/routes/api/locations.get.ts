export default defineEventHandler(() => {
  return prisma.location.findMany()
})
