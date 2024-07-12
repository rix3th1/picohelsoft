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
    <section
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <DashboardPaymentsEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
