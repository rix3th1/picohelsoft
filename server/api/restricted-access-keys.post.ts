import { RestrictedAccessKey } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<RestrictedAccessKey>(event)

  const restrictedAccessKey = await prisma.restrictedAccessKey.findUnique({
    where: { key: body.key }
  })

  return {
    verified: restrictedAccessKey?.key === body.key
  }
})
