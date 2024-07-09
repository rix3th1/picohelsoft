<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

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
