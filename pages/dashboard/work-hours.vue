<script setup lang="ts">
const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="REGISTRO DE HORARIOS" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <DashboardWorkHoursEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
