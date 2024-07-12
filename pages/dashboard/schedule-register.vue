<script setup lang="ts">
useSeoMeta({
  title: 'Registro de horarios | Picohelsoft',
  description: 'Registro de horarios de los empleados de Picohelsoft.'
})

const { data: employees, refresh } = await useDashboardEmployees()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="REGISTRO DE HORARIOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <DashboardScheduleRegisterEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
