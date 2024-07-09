<script setup lang="ts">
import type { DropdownItem } from '#ui/types'
import {
  browserSupportsWebAuthn,
  startRegistration
} from '@simplewebauthn/browser'
import type { VerifiedRegistrationResponse } from '@simplewebauthn/server'
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types'

const columns = useDashboardEmployeesTableColumns()
const { data: employees } = await useDashboardEmployees()

const q = ref('')
const isLoading = ref(false)

const filteredRows = computed(() => {
  if (!q.value) {
    return employees.value
  }

  return employees.value?.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = 5

const toast = useToast()

async function register2FA(employeeId: string) {
  if (!browserSupportsWebAuthn()) {
    toast.add({
      title: 'WebAuthn no soportado :(',
      description: 'Por favor, actualice su navegador',
      color: 'orange'
    })
  }

  isLoading.value = true
  try {
    // GET registration options from the endpoint that calls
    // @simplewebauthn/server -> generateRegistrationOptions()
    const registrationOpts =
      await $fetch<PublicKeyCredentialCreationOptionsJSON>(
        `/api/2fa/webauthn/register/${employeeId}`
      )
    // Pass the options to the authenticator and wait for a response
    const attResp = await startRegistration(registrationOpts)
    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResponse = await $fetch<
      Omit<VerifiedRegistrationResponse, 'registrationInfo'>
    >(`/api/2fa/webauthn/register/${employeeId}`, {
      method: 'POST',
      body: attResp
    })

    if (verificationResponse && verificationResponse.verified) {
      toast.add({
        title: 'Huella dactilar registrada.',
        description: 'Autenticador registrado exitosamente!',
        color: 'green'
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      if (error.name === 'InvalidStateError') {
        toast.add({
          title: 'Error al registrar huella.',
          description:
            'El autenticador probablemente ya ha sido registrado por el empleado.',
          color: 'red'
        })
      }
    }
  } finally {
    isLoading.value = false
  }
}

const items = (row: any): DropdownItem[][] => [
  [
    {
      label: 'Registrar huella',
      icon: 'i-heroicons-finger-print-20-solid',
      click: () => register2FA(row.id)
    }
  ]
]
</script>

<template>
  <div>
    <div
      class="flex justify-end py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput
        id="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        trailing
        v-model="q"
        placeholder="Buscar usuario..."
      />
    </div>

    <UTable :rows="[...filteredRows]" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            :loading="isLoading"
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredRows?.length ?? 0"
      />
    </div>
  </div>
</template>
