<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const locations = usePicoHelsoftLocations()

const schema = z.object({
  start_time: z.string({
    message: 'El horario de inicio es obligatorio'
  }),
  end_time: z.string({
    message: 'El horario de salida es obligatorio'
  }),
  location: z.object({}, { message: 'Sede es obligatorio' })
})

type Schema = z.output<typeof schema>

const state = reactive({
  start_time: undefined,
  end_time: undefined,
  location: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
  alert('Send')
}
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
          <DashboardUserCardHeader />
        </template>

        <DashboardUserCardBody
          title="Leonard Krasner"
          label="Registre aqui el horario de su empleado"
        />

        <template #footer>
          <DashboardUserCardFooter>
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-3"
              @submit="onSubmit"
            >
              <UFormGroup name="start_time" label="Horario de inicio" required>
                <UInput
                  id="start_time"
                  v-model="state.start_time"
                  type="datetime-local"
                  icon="i-heroicons-calendar"
                  size="sm"
                />
              </UFormGroup>
              <UFormGroup name="end_time" label="Horario de salida" required>
                <UInput
                  id="end_time"
                  v-model="state.end_time"
                  type="datetime-local"
                  icon="i-heroicons-calendar"
                  size="sm"
                />
              </UFormGroup>

              <UFormGroup name="location" label="Sede" required>
                <USelectMenu
                  v-model="state.location"
                  :options="locations"
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
          </DashboardUserCardFooter>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
