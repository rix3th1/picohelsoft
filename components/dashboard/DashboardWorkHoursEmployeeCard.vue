<script setup lang="ts">
const props = defineProps<{
  employee: Employee
}>()

const toast = useToast()
const isLoading = ref(false)

import type { FormSubmitEvent } from '#ui/types'
import type { Employee } from '@prisma/client'
import { z } from 'zod'

const schema = z
  .object({
    start_time: z.string({
      message: 'El horario de inicio es obligatorio'
    }),
    end_time: z.string({
      message: 'El horario de salida es obligatorio'
    })
  })
  .refine((data) => data.start_time < data.end_time, {
    message: 'La hora de inicio debe ser menor que la hora de salida',
    path: ['start_time']
  })

type Schema = z.output<typeof schema>

const state = reactive({
  start_time: undefined,
  end_time: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  const { start_time, end_time } = event.data
  try {
    await $fetch('/api/work-hours', {
      method: 'POST',
      body: {
        employeeId: props.employee.id,
        startTime: start_time,
        endTime: end_time
      }
    })

    toast.add({
      title: 'Horario de ingreso y salida actualizado',
      description: props.employee.name
    })

    state.start_time = undefined
    state.end_time = undefined
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al actualizar horario de ingreso y salida',
        description: error.message
      })
    }
  } finally {
    isLoading.value = false
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
      label="Registre aqui el horario de su empleado"
    />

    <template #footer>
      <DashboardUserCardFooter>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-3"
          @submit="onSubmit"
        >
          <UFormGroup name="start_time" label="Horario de inicio" required>
            <UInput
              id="start_time"
              v-model="state.start_time"
              type="datetime-local"
              icon="i-heroicons-calendar"
              size="sm"
              :disabled="isLoading"
            />
          </UFormGroup>
          <UFormGroup name="end_time" label="Horario de salida" required>
            <UInput
              id="end_time"
              v-model="state.end_time"
              type="datetime-local"
              icon="i-heroicons-calendar"
              size="sm"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UButton
            type="submit"
            color="indigo"
            size="lg"
            icon="i-heroicons-check-circle"
            trailing
            :loading="isLoading"
          >
            GUARDAR
          </UButton>
        </UForm>
      </DashboardUserCardFooter>
    </template>
  </UCard>
</template>
