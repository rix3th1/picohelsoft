<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Liquidación de pagos | Picohelsoft',
  description: 'Liquidación de pagos de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <section>
    <DashboardTitle title="LIQUIDACIÓN DE PAGOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardPaymentsEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </div>
  </section>
</template>
