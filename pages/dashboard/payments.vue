<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="LIQUIDACIÓN DE PAGOS" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <UCard
        v-for="index in 4"
        :key="index"
        class="w-full max-w-md text-center"
      >
        <template #header>
          <div class="flex justify-center gap-x-5">
            <img
              src="~/assets/user1.png"
              alt="user"
              class="w-2/5 h-2/5 rounded-full"
            />
          </div>
        </template>

        <h1 class="text-3xl font-medium text-indigo-500 mb-4">
          Leonard Krasner
        </h1>
        <p class="text-sm text-gray-500">
          Genere y descargue aquí la liquidación de su empleado
        </p>

        <template #footer>
          <div class="flex justify-center gap-x-2">
            <UTooltip text="Generar liquidación">
              <UButton
                color="indigo"
                size="lg"
                icon="i-heroicons-arrow-path"
                trailing
              />
            </UTooltip>
            <UTooltip text="Descargar liquidación">
              <UButton
                color="indigo"
                size="lg"
                icon="i-heroicons-arrow-down-tray"
              />
            </UTooltip>
          </div>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
