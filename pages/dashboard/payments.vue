<script setup lang="ts">
useSeoMeta({
  title: 'Liquidación de pagos | Picohelsoft',
  description: 'Liquidación de pagos de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="LIQUIDACIÓN DE PAGOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <DashboardPaymentsEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
