<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  pin: z
    .string({ required_error: 'El pin de seguridad es obligatorio' })
    .refine((value) => value.length >= 4 && value.length <= 6, {
      message: 'El pin de seguridad debe tener entre 4 y 6 dígitos'
    })
})

type Schema = z.infer<typeof schema>

const state = reactive({
  pin: undefined
})

const isLoading = ref(false)
const isOpen = useModalNewSecurityPinOpen()
const toast = useToast()
const employeeIdAux = useEmployeeId()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { pin } = event.data
  const employeeId = employeeIdAux.value

  isLoading.value = true
  try {
    await $fetch('/api/security-pins', {
      method: 'POST',
      body: {
        pin,
        employeeId
      }
    })

    toast.add({
      title: 'Pin de seguridad creado!',
      description: `Se ha creado pin de seguridad para el empleado con ID ${employeeIdAux.value}`,
      color: 'green'
    })

    isOpen.value.isOpen = false
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al crear el pin de seguridad',
        description: error.message
      })
    }
  } finally {
    isLoading.value = false
    employeeIdAux.value = ''
    state.pin = undefined
  }
}
</script>

<template>
  <UModal v-model="isOpen.isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Por favor, crea tu pin de seguridad
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen.isOpen = false"
          />
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-5"
        @submit="onSubmit"
      >
        <UFormGroup name="pin">
          <UInput
            color="indigo"
            id="pin"
            v-model="state.pin"
            type="password"
            placeholder="Pin de seguridad"
            size="xl"
            icon="i-heroicons-lock-closed"
            autocomplete="off"
            autofocus
          />
        </UFormGroup>
        <UButton
          type="submit"
          block
          color="indigo"
          size="xl"
          icon="i-heroicons-key"
          :loading="isLoading"
        >
          Aceptar
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
