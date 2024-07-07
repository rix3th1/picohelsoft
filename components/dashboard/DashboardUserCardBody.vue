<script setup lang="ts">
defineProps<{
  title: string
  label: string
}>()
</script>

<template>
  <h1 class="text-3xl font-medium text-indigo-500 mb-4">{{ title }}</h1>
  <p class="text-sm text-gray-500">{{ label }}</p>
</template>
