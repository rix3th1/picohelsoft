<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Registro de horarios | Picohelsoft',
  description: 'Registro de horarios de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <section>
    <DashboardTitle title="REGISTRO DE HORARIOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <DashboardVerifySecurityPinModal />

    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardScheduleRegisterEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </div>
  </section>
</template>
