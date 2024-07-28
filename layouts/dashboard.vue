<template>
  <div id="dashboard">
    <DashboardNav />
    <UContainer class="mt-[8rem]">
      <slot />
    </UContainer>

    <LazyUSlideovers />
    <LazyDashboardModalAccess />
  </div>
</template>
