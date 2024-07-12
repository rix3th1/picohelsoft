<template>
  <DashboardNav />
  <UContainer as="main">
    <slot />
  </UContainer>

  <LazyDashboardModalAccess />
</template>
