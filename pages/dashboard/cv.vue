<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Hoja de vida | Picohelsoft',
  description: 'Hoja de vida de los empleados de Picohelsoft.'
})

const { data: employees } = await useDashboardEmployees()
</script>

<template>
  <section>
    <DashboardTitle title="HOJAS DE VIDA DE USUARIO" />
    <DashboardNoEmployeesAlert :show="!employees?.length" />
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardCVEmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="Object(employee)"
      />
    </div>
  </section>
</template>
