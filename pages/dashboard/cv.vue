<script setup lang="ts">
useSeoMeta({
  title: 'Hoja de vida | Picohelsoft',
  description: 'Hoja de vida de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="HOJAS DE VIDA DE USUARIO" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <DashboardCVEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </section>
  </NuxtLayout>
</template>
