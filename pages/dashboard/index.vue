<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="BIENVENIDOS A PICOHELSOFT" />
    <DashboardWorkHoursTable />
  </NuxtLayout>
</template>
