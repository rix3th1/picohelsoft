<script setup lang="tsx">
useSeoMeta({
  title: 'Dashboard | Picohelsoft',
  description: 'Panel de control de Picohelsoft.'
})
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="BIENVENIDOS A PICOHELSOFT" />
    <DashboardActionButtonGroup :filtered-rows="[]" />
    <DashboardWorkHoursTable />
  </NuxtLayout>
</template>
