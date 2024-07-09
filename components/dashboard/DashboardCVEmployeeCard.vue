<script setup lang="ts">
import type { Employee } from '@prisma/client'

defineProps<{
  employee: Employee
}>()

import { z } from 'zod'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1 // 1 MB
const ACCEPTED_FILE_TYPES = ['application/pdf']

const schema = z.object({
  cv: z
    .instanceof(File, { message: 'El archivo debe ser de tipo PDF' })
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'El archivo debe ser menor a 1 MB'
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'El archivo debe ser de tipo PDF'
    )
})

const cv = ref()
const isLoading = ref(false)

const toast = useToast()

const onClickSubmit = async (employeeId: string) => {
  const result = schema.safeParse({ cv: cv.value })

  if (!result.success) {
    toast.add({
      title: 'Archivo inválido',
      description: result.error.issues[0].message,
      color: 'red'
    })
    return
  }

  const formData = new FormData()
  formData.append('cv', result.data.cv)
  formData.append('employeeId', employeeId)

  isLoading.value = true
  try {
    await $fetch('/api/cv', {
      method: 'POST',
      body: formData
    })

    toast.add({
      title: 'Archivo guardado',
      description: 'El archivo se ha guardado correctamente',
      color: 'green'
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al guardar CV',
        description: error.message
      })

      cv.value = undefined
    }
  } finally {
    isLoading.value = false
  }
}

const onFileChange = (fileList: FileList) => {
  if (!fileList.length) return
  cv.value = fileList[0]
}
</script>

<template>
  <UCard class="w-full max-w-md text-center">
    <template #header>
      <DashboardUserCardHeader :gender="employee.gender" />
    </template>

    <DashboardUserCardBody
      :title="employee.name"
      label="Suba aquí su hoja de vida en formato PDF"
    />

    <template #footer>
      <DashboardUserCardFooter>
        <div class="space-y-4">
          <UFormGroup name="cv">
            <UInput
              id="cv"
              type="file"
              accept="application/pdf"
              icon="i-heroicons-folder"
              size="md"
              @change="onFileChange"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UButton
            :loading="isLoading"
            color="indigo"
            size="lg"
            icon="i-heroicons-check-circle"
            trailing
            @click="() => onClickSubmit(employee.id)"
          >
            GUARDAR
          </UButton>
        </div>
      </DashboardUserCardFooter>
    </template>
  </UCard>
</template>
