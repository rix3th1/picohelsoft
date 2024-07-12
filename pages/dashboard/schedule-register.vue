<script setup lang="ts">
useSeoMeta({
  title: 'Registro de horarios | Picohelsoft',
  description: 'Registro de horarios de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="REGISTRO DE HORARIOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <DashboardVerifySecurityPinModal />

    <section
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <DashboardScheduleRegisterEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
