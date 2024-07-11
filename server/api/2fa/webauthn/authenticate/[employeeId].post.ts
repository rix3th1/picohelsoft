import {
  type VerifiedAuthenticationResponse,
  verifyAuthenticationResponse
} from '@simplewebauthn/server'
import type { AuthenticationResponseJSON } from '@simplewebauthn/typescript-types'
import prisma from '~/lib/prisma'
import { getAuthenticatorByCredentialId } from '~/lib/webauthn'
import type { Authenticator } from '~/webauthn'

/**
 * [POST]: /api/2fa/webauthn/authenticate/{employeeId}
 * Endpoint for verify authentication options for WebAuthn.
 */
export default defineEventHandler(async (event) => {
  const {
    webauthn: { rpID }
  } = useRuntimeConfig()

  const employeeId = getRouterParam(event, 'employeeId')
  if (!employeeId) {
    throw new Error()
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { authenticators: true }
  })

  if (!existingEmployee) {
    throw new Error('El empleado no fue encontrado.')
  }

  const expectedChallenge = existingEmployee.currentChallenge
  const currentEmployeeAuthenticators = existingEmployee.authenticators
  if (!currentEmployeeAuthenticators.length) {
    throw new Error('No se encontraron autenticadores para el empleado.')
  }

  const body = await readBody(event)
  const authenticationResponse: AuthenticationResponseJSON = JSON.parse(
    body.verification
  )

  const authenticatorFound = getAuthenticatorByCredentialId(
    currentEmployeeAuthenticators,
    authenticationResponse.rawId
  ) as Authenticator
  if (!authenticatorFound || !authenticatorFound.id || !expectedChallenge) {
    throw new Error(
      `No se encontró el authenticator para el empleado ${existingEmployee.name}.`
    )
  }

  let verification: VerifiedAuthenticationResponse
  try {
    verification = await verifyAuthenticationResponse({
      response: authenticationResponse,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: authenticatorFound
    })
  } catch (error) {
    console.error({ error })
    return null
  }

  const { verified, authenticationInfo } = verification || {}

  if (verified) {
    const { newCounter } = authenticationInfo
    // Responsability: Update the new counter
    await prisma.authenticator.update({
      where: { id: authenticatorFound.id },
      data: { counter: newCounter }
    })

    return { verified }
  }
  return null
})
