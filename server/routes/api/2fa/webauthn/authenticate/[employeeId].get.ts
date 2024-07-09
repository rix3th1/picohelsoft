import { generateAuthenticationOptions } from '@simplewebauthn/server'
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types'
import prisma from '~/lib/prisma'
import { getPublicKeyCredentialDescriptor } from '~/lib/webauthn'

/**
 * [GET]: /api/2fa/webauthn/authenticate/{employeeId}
 * Endpoint for generate authentication options for WebAuthn.
 */
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

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

  // registered authenticators
  const employeeAuthenticators = existingEmployee.authenticators

  if (!employeeAuthenticators.length) {
    throw new Error('No se encontraron autenticadores para el empleado.')
  }

  const options: PublicKeyCredentialRequestOptionsJSON =
    await generateAuthenticationOptions({
      rpID: runtimeConfig.webauthn.rpID,
      // Require users to use a previously-registered authenticator
      allowCredentials: getPublicKeyCredentialDescriptor(
        employeeAuthenticators
      ),
      userVerification: 'preferred'
    })

  await prisma.employee.update({
    where: { id: employeeId },
    data: { currentChallenge: options.challenge }
  })

  return options
})
