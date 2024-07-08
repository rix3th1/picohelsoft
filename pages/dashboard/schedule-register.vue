<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="REGISTRO DE HORARIOS" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <UCard
        v-for="index in 4"
        :key="index"
        class="w-full max-w-md text-center"
      >
        <template #header>
          <DashboardUserCardHeader />
        </template>

        <DashboardUserCardBody
          title="Leonard Krasner"
          label="Registre aquí el horario de ingreso y salida de su trabajo"
        />

        <template #footer>
          <DashboardUserCardFooter>
            <UButton
              color="indigo"
              label="INICIO"
              size="lg"
              icon="i-heroicons-finger-print-20-solid"
              trailing
            />
            <UButton
              color="indigo"
              label="SALIDA"
              size="lg"
              icon="i-heroicons-finger-print-20-solid"
            />
          </DashboardUserCardFooter>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
