<script setup lang="ts">
import type { Employee } from '@prisma/client'

const props = defineProps<{
  employee: Employee
}>()

const isLoadingStart = ref(false)
const isLoadingEnd = ref(false)
const toast = useToast()

const { data: workHour, status } = await useWorkHour(props.employee.id)
const isNewSchedule: boolean = !!workHour.value

const registerWorkHour = async (type: 'start' | 'end') => {
  type === 'end' ? (isLoadingEnd.value = true) : (isLoadingStart.value = true)
  try {
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
          :text="`Registrar horario de ingreso de ${employee.name}`"
        >
          <UButton
            @click="registerWorkHour('start')"
            color="indigo"
            label="INICIO"
            size="lg"
            icon="i-heroicons-lock-closed"
            trailing
            :loading="status === 'pending' || isLoadingStart"
          />
        </UTooltip>
        <UTooltip
          class="w-5/12"
          :text="`Registrar horario de salida de ${employee.name}`"
        >
          <UButton
            @click="registerWorkHour('end')"
            color="indigo"
            label="SALIDA"
            size="lg"
            icon="i-heroicons-lock-closed"
            :loading="status === 'pending' || isLoadingEnd"
          />
        </UTooltip>
      </DashboardUserCardFooter>
    </template>
  </UCard>
</template>
