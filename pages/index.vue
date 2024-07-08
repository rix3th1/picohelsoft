<script setup lang="ts">
definePageMeta({
  middleware: 'guest-only',
  auth: { authenticatedRedirectTo: '/dashboard' }
})
</script>

<template>
  <NuxtLayout name="signin">
    <SigninCard />
  </NuxtLayout>
</template>
