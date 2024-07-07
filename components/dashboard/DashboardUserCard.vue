<template>
  <section class="grid place-items-center grid-cols-4 gap-4 items-center">
    <UCard v-for="index in 4" :key="index" class="w-full max-w-md text-center">
      <template #header>
        <DashboardUserCardHeader />
      </template>

      <slot />
    </UCard>
  </section>
</template>
