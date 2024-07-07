<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="my-10">
    <h1 class="text-3xl font-medium mb-4">{{ title }}</h1>
    <UDivider />
  </div>
</template>
