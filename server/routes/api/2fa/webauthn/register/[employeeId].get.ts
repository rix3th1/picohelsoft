import { generateRegistrationOptions } from '@simplewebauthn/server'
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types'
import prisma from '~/lib/prisma'
import { getPublicKeyCredentialDescriptor } from '~/lib/webauthn'

/**
 * [GET]: /api/2fa/webauthn/register/{employeeId}
 * Endpoint for generate registration options for WebAuthn.
 */
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const employeeId = getRouterParam(event, 'employeeId')

  const existingEmployee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { authenticators: true }
  })

  if (!existingEmployee) {
    throw new Error('El empleado no fue encontrado.')
  }

  const employeeAuthenticators = existingEmployee.authenticators

  const options: PublicKeyCredentialCreationOptionsJSON =
    await generateRegistrationOptions({
      rpName: runtimeConfig.webauthn.rpName,
      rpID: runtimeConfig.webauthn.rpID,
      userID: employeeId ?? '',
      userName: existingEmployee?.name ?? '',
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: 'none',
      // Prevent users from re-registering existing authenticators
      excludeCredentials: !employeeAuthenticators
        ? []
        : getPublicKeyCredentialDescriptor(employeeAuthenticators),
      authenticatorSelection: {
        // "Discoverable credentials" used to be called "resident keys". The
        // old name persists in the options passed to `navigator.credentials.create()`.
        residentKey: 'required',
        userVerification: 'preferred'
      }
    })

  await prisma.employee.update({
    where: { id: employeeId },
    data: { currentChallenge: options.challenge }
  })

  return options
})
