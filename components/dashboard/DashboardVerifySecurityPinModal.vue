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

const toast = useToast()

type Schema = z.infer<typeof schema>

const state = reactive({
  pin: undefined
})

const isLoading = ref(false)
const isOpen = useModalVerifySecurityPinOpen()
const scheduleType = useScheduleType()

const { data: workHour } = await useWorkHour(isOpen.value.employeeId)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { pin } = event.data

  isLoading.value = true
  try {
    const response = await $fetch(`/api/security-pins/${pin}`, {
      method: 'POST'
    })

    if (!response.verified) {
      toast.add({
        color: 'red',
        title: 'Error al verificar el pin de seguridad',
        description: 'El pin de seguridad no es correcto'
      })
      return
    }

    toast.add({
      color: 'green',
      title: 'Pin de seguridad verificado',
      description: 'El pin de seguridad es correcto'
    })

    if (scheduleType.value === 'start') {
      await $fetch('/api/work-hours', {
        method: 'POST',
        body: {
          startTime: new Date().toISOString(),
          employeeId: isOpen.value.employeeId
        }
      })
    } else if (scheduleType.value === 'end') {
      await $fetch(`/api/work-hours/${(workHour.value as any).id}`, {
        method: 'PATCH',
        body: {
          endTime: new Date().toISOString(),
          employeeId: isOpen.value.employeeId
        }
      })
    }

    toast.add({
      title: 'Horario registrado',
      description: 'El horario ha sido registrado correctamente',
      color: 'green'
    })
    isOpen.value.isOpen = false
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
    isLoading.value = false
    state.pin = undefined
  }
}
</script>

<template>
  <UModal v-model="isOpen.isOpen" prevent-close>
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
            Por favor, ingrese su pin de seguridad
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
