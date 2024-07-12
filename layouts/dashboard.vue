<template>
  <DashboardNav />
  <main class="flex">
    <DashboardMainAside />
    <div class="flex-1 p-4">
      <UContainer>
        <slot />
      </UContainer>
    </div>
  </main>

  <LazyDashboardModalAccess />
</template>
