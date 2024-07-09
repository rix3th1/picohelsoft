import { getServerSession, getServerToken } from '#auth'
import { authOptions } from './auth/[...]'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions)
  const jwt = await getServerToken(event, authOptions)
  return { session, jwt }
})
