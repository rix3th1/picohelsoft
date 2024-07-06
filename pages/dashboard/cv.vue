<script setup lang="ts">
const MAX_UPLOAD_SIZE = 1024 * 1024 * 1 // 1 MB
const ACCEPTED_FILE_TYPES = ['application/pdf']

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  cv: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'El archivo debe ser menor a 1 MB'
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'El archivo debe ser de tipo PDF'
    )
})

type Schema = z.output<typeof schema>

const state = reactive({
  cv: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="HOJAS DE VIDA DE USUARIO" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <UCard
        v-for="index in 4"
        :key="index"
        class="w-full max-w-md text-center"
      >
        <template #header>
          <div class="flex justify-center gap-x-5">
            <img
              src="~/assets/user1.png"
              alt="user"
              class="w-2/5 h-2/5 rounded-full"
            />
          </div>
        </template>

        <h1 class="text-3xl font-medium text-indigo-500 mb-4">
          Leonard Krasner
        </h1>
        <p class="text-sm text-gray-500">
          Suba aquí su hoja de vida en formato PDF
        </p>

        <template #footer>
          <div class="flex justify-center gap-x-5">
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="onSubmit"
            >
              <UInput
                id="cv"
                v-model="state.cv"
                type="file"
                accept="application/pdf"
                icon="i-heroicons-folder"
                size="md"
              />

              <UButton
                type="submit"
                color="indigo"
                size="lg"
                icon="i-heroicons-check-circle"
                trailing
              >
                GUARDAR
              </UButton>
            </UForm>
          </div>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
