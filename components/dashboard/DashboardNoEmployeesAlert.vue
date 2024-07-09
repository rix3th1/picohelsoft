<script setup lang="ts">
defineProps<{ show?: boolean }>()
</script>

<template>
  <UAlert
    class="my-4"
    v-show="show"
    icon="i-heroicons-megaphone"
    description="En este momento no se encuentran empleados registrados en la base de datos de Picohelsoft."
    title="No hay empleados registrados!"
  />
</template>
