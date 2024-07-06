<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1 // 1 MB
const ACCEPTED_FILE_TYPES = ['application/pdf']

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

const campuses = [
  { id: 1, name: 'Espinal Centro', colors: ['red', 'yellow'] },
  { id: 2, name: 'Espinal Pijaos Mall', colors: ['blue', 'yellow'] },
  { id: 3, name: 'Ibagué', colors: ['green', 'blue'] }
]

const selected = ref(campuses[1])
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="REGISTRO DE HORARIOS" />

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
          Registre aqui el horario de su empleado
        </p>

        <template #footer>
          <div class="flex justify-center gap-x-5">
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-3"
              @submit="onSubmit"
            >
              <UFormGroup label="Horario de inicio" required>
                <UInput
                  id="cv"
                  v-model="state.cv"
                  type="datetime-local"
                  icon="i-heroicons-calendar"
                  size="sm"
                />
              </UFormGroup>
              <UFormGroup label="Horario de salida" required>
                <UInput
                  id="cv"
                  v-model="state.cv"
                  type="datetime-local"
                  icon="i-heroicons-calendar"
                  size="sm"
                />
              </UFormGroup>

              <UFormGroup label="Sede" required>
                <USelectMenu
                  v-model="selected"
                  :options="campuses"
                  placeholder="Select a person"
                  searchable
                  searchable-placeholder="Search by name or color"
                  option-attribute="name"
                  by="id"
                  :search-attributes="['name', 'colors']"
                >
                  <template #option="{ option: person }">
                    <span
                      v-for="color in person.colors"
                      :key="color.id"
                      class="h-2 w-2 rounded-full"
                      :class="`bg-${color}-500 dark:bg-${color}-400`"
                    />
                    <span class="truncate">{{ person.name }}</span>
                  </template>
                </USelectMenu>
              </UFormGroup>

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
