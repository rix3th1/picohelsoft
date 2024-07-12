<template>
  <DashboardNav />
  <UContainer as="main" class="mt-[8rem]">
    <slot />
  </UContainer>

  <LazyDashboardModalAccess />
</template>
