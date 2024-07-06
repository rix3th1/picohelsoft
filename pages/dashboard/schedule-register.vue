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
          Registre aquí el horario de ingreso y salida de su trabajo
        </p>

        <template #footer>
          <div class="flex justify-center gap-x-5">
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
          </div>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
