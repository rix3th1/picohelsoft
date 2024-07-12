<script setup lang="ts">
import type { Employee } from '@prisma/client'

const props = defineProps<{
  employee: Employee
}>()

const isLoading = ref(false)
const downloadIsReady = ref(false)
const downloadHref = ref('')
const filename = ref('')

const toast = useToast()

const download = () => {
  const link = document.createElement('a')
  link.href = downloadHref.value
  link.download = filename.value
  link.click()
  URL.revokeObjectURL(link.href)
  downloadIsReady.value = false
}

const generateSettlement = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/settlements/${props.employee.id}`, {
      method: 'GET'
    })
    const blob = await response.blob()
    const fn = `${props.employee.name}-${new Date().toISOString()}.pdf`
    const url = URL.createObjectURL(blob)
    filename.value = fn
    downloadHref.value = url
    downloadIsReady.value = true
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        title: 'Error al generar liquidación',
        description: error.message,
        color: 'red'
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-md text-center">
    <template #header>
      <DashboardUserCardHeader :gender="employee.gender" />
    </template>

    <DashboardUserCardBody
      :title="employee.name"
      label="Genere y descargue aquí la liquidación de su empleado"
    />

    <template #footer>
      <div class="flex justify-center gap-x-2">
        <UTooltip text="Generar liquidación">
          <UButton
            @click="generateSettlement"
            color="indigo"
            size="lg"
            icon="i-heroicons-arrow-path"
            trailing
            :loading="isLoading"
          />
        </UTooltip>
        <UTooltip v-show="downloadIsReady" text="Descargar liquidación">
          <UButton
            @click="download"
            color="indigo"
            size="lg"
            icon="i-heroicons-arrow-down-tray"
          />
        </UTooltip>
      </div>
    </template>
  </UCard>
</template>
