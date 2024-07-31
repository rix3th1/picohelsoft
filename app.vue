<template>
  <NuxtLoadingIndicator error-color="red" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <LazyColorSchemeSelector />
  <LazyUNotifications />
</template>

<style>
body {
  height: 100vh;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
