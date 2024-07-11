import {
  type VerifiedRegistrationResponse,
  verifyRegistrationResponse
} from '@simplewebauthn/server'
import type { RegistrationResponseJSON } from '@simplewebauthn/typescript-types'
import prisma from '~/lib/prisma'

/**
 * [POST]: /api/2fa/webauthn/register/{employeeId}
 * Endpoint for verify registration options for WebAuthn.
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

  const response = await readBody<RegistrationResponseJSON>(event)
  const expectedChallenge = existingEmployee?.currentChallenge

  if (expectedChallenge) {
    const verification: VerifiedRegistrationResponse =
      await verifyRegistrationResponse({
        response,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID
      })

    if (!verification) {
      throw new Error()
    }

    const { verified, registrationInfo } = verification || {}
    const {
      credentialPublicKey,
      credentialID,
      counter,
      credentialDeviceType,
      credentialBackedUp
    } = registrationInfo || {}

    // Save the authenticator info so that we can
    // get it by user ID later
    if (!credentialID || !credentialPublicKey) {
      throw new Error()
    }
    await prisma.authenticator.create({
      data: {
        employeeId: employeeId,
        credentialID: Buffer.from(credentialID),
        credentialPublicKey: Buffer.from(credentialPublicKey),
        counter: counter ?? 0,
        credentialDeviceType: credentialDeviceType ?? 'singleDevice',
        credentialBackedUp: credentialBackedUp ?? false,
        transports: response.response.transports
      }
    })
    // Activate 2FA Auth for the employee
    await prisma.employee.update({
      where: { id: employeeId },
      data: { is2FAEnabled: true }
    })

    return { verified }
  }
})
