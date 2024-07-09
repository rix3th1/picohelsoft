<script setup lang="ts">
import type { Employee } from '@prisma/client'
import {
  browserSupportsWebAuthn,
  startAuthentication
} from '@simplewebauthn/browser'
import type { VerifiedAuthenticationResponse } from '@simplewebauthn/server'
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types'

const props = defineProps<{
  employee: Employee
}>()

const isLoadingStart = ref(false)
const isLoadingEnd = ref(false)
const toast = useToast()

const { data: workHour, status } = await useWorkHour(props.employee.id)
const isNewSchedule = !!workHour.value

const registerWorkHour = async (type: 'start' | 'end') => {
  if (!browserSupportsWebAuthn()) {
    toast.add({
      title: 'WebAuthn no soportado :(',
      description: 'Por favor, actualice su navegador',
      color: 'orange'
    })
  }

  type === 'end' ? (isLoadingEnd.value = true) : (isLoadingStart.value = true)
  try {
    // GET authentication options from the endpoint that calls
    // @simplewebauthn/server -> generateAuthenticationOptions()
    const AuthenticationOpts =
      await $fetch<PublicKeyCredentialRequestOptionsJSON>(
        `/api/2fa/webauthn/authenticate/${props.employee.id}`,
        { method: 'GET' }
      )

    // Pass the options to the authenticator and wait for a response
    const asseResp = await startAuthentication(AuthenticationOpts)
    /**
     * Pass the verification response to the webauthn custom provider
     * verification parsed to JSON and document credential to
     * identify the user
     */
    const sessionResp = await $fetch<VerifiedAuthenticationResponse>(
      `/api/2fa/webauthn/authenticate/${props.employee.id}`,
      {
        method: 'POST',
        body: {
          verification: asseResp
        }
      }
    )

    if (sessionResp && sessionResp.verified) {
      toast.add({
        title: 'Huella dactilar reconocida.',
        description: 'Registrando el horario...',
        color: 'green'
      })
    }

    if (type === 'start' && !workHour.value) {
      await $fetch('/api/work-hours', {
        method: 'POST',
        body: {
          startTime: new Date().toISOString(),
          employeeId: props.employee.id
        }
      })
    } else if (type === 'end' && workHour.value) {
      await $fetch(`/api/work-hours/${(workHour.value as any).id}`, {
        method: 'PATCH',
        body: {
          endTime: new Date().toISOString(),
          employeeId: props.employee.id
        }
      })
    }

    toast.add({
      title: 'Horario registrado',
      description: 'El horario ha sido registrado correctamente',
      color: 'green'
    })

    window.location.reload()
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al registrar horario',
        description: error.message
      })
    }
  } finally {
    isLoadingEnd.value = false
    isLoadingStart.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-md text-center">
    <template #header>
      <DashboardUserCardHeader :gender="employee.gender" />
    </template>

    <DashboardUserCardBody
      :title="employee.name"
      label="Registre aquí el horario de ingreso y salida de su trabajo"
    />

    <template #footer>
      <DashboardUserCardFooter>
        <UTooltip
          class="w-5/12"
          :text="
            !isNewSchedule && !workHour?.createdAt
              ? `Registrar horario de ingreso de ${employee.name}`
              : 'Ya has registrado el horario de ingreso'
          "
        >
          <UButton
            @click="registerWorkHour('start')"
            :disabled="isNewSchedule || !!workHour?.createdAt"
            color="indigo"
            label="INICIO"
            size="lg"
            icon="i-heroicons-finger-print-20-solid"
            trailing
            :loading="status === 'pending' || isLoadingStart"
          />
        </UTooltip>
        <UTooltip
          class="w-5/12"
          :text="
            isNewSchedule && !workHour?.endTime
              ? `Registrar horario de salida de ${employee.name}`
              : 'Ya has registrado el horario de salida'
          "
        >
          <UButton
            @click="registerWorkHour('end')"
            :disabled="!isNewSchedule || !!workHour?.endTime"
            color="indigo"
            label="SALIDA"
            size="lg"
            icon="i-heroicons-finger-print-20-solid"
            :loading="status === 'pending' || isLoadingEnd"
          />
        </UTooltip>
      </DashboardUserCardFooter>
    </template>
  </UCard>
</template>
