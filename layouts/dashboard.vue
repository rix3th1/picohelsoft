<template>
  <div id="dashboard">
    <DashboardNav />
    <UContainer class="mt-[8rem]">
      <slot />
    </UContainer>

    <LazyDashboardModalAccess />
  </div>
</template>
