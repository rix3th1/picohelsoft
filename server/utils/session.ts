import { getServerSession } from '#auth'
import { type H3Event } from 'h3'
import { authOptions } from '~/server/routes/api/auth/[...]'

export const getAuthSession = (event: H3Event) =>
  getServerSession(event, authOptions)
