<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Dashboard | Picohelsoft',
  description: 'Panel de control de Picohelsoft.'
})
</script>

<template>
  <section>
    <DashboardTitle title="BIENVENIDOS A PICOHELSOFT" />
    <DashboardWorkHoursTable />
  </section>
</template>
