<template>
  <DashboardNav />
  <main class="flex">
    <DashboardMainAside />
    <div class="flex-1 p-4">
      <slot />
    </div>
  </main>
</template>
