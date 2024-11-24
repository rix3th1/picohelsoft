<script setup lang="ts">
import type { Employee } from '@prisma/client'

const props = defineProps<{
  employee: Employee
}>()

const isOpen = useModalVerifySecurityPinOpen()
const scheduleType = useScheduleType()
isOpen.value.employeeId = props.employee.id
watch(scheduleType.value, () => {
  isOpen.value.employeeId = props.employee.id
})

const registerWorkHour = (type: 'start' | 'end') => {
  isOpen.value.isOpen = true
  scheduleType.value = type
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
          />
        </UTooltip>
      </DashboardUserCardFooter>
    </template>
  </UCard>
</template>
