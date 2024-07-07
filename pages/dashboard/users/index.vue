<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const userAddSchema = z.object({
  name: z.string().min(3, 'El nombre es obligatorio'),
  document: z.number().min(10, 'El documento es obligatorio'),
  location: z.object({}, { message: 'Sede es obligatorio' })
})

type UserAddSchema = z.infer<typeof userAddSchema>

const userDeleteSchema = z.object({
  user: z.object({}, { message: 'Usuario es obligatorio' })
})

type UserDeleteSchema = z.infer<typeof userDeleteSchema>

const userUpdateSchema = z.object({
  name: z.string().min(3, 'El nombre es obligatorio').optional(),
  document: z.number().min(10, 'El documento es obligatorio').optional(),
  location: z.object({}, { message: 'Sede es obligatorio' }).optional()
})

type UserUpdateSchema = z.infer<typeof userUpdateSchema>

const items = useDashboardTabItems()
const locations = usePicoHelsoftLocations()
const people = useDashboardUsersPeople()

const userAddFormState = reactive({
  name: '',
  document: '',
  location: locations[0]
})
const userDeleteFormState = reactive<{
  user?: (typeof people)[0]
}>({
  user: people[0]
})
const userUpdateFormState = reactive({
  name: '',
  document: '',
  location: locations[0]
})

function onSubmitUserAdd(event: FormSubmitEvent<UserAddSchema>) {
  console.log(event.data)
  alert('Submitted form:')
}

function onSubmitUserDelete(event: FormSubmitEvent<UserDeleteSchema>) {
  console.log(event.data)
  alert('Submitted form:')
}

function onSubmitUserUpdate(event: FormSubmitEvent<UserUpdateSchema>) {
  console.log(event.data)
  alert('Submitted form:')
}

import type { Avatar } from '#ui/types'
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="GESTIÓN DE USUARIOS" />

    <UCard class="w-full">
      <template #header>
        <h2
          class="text-2xl font-semibold leading-10 text-gray-900 dark:text-white"
        >
          Hola, Bienvenido a la sección de gestión de usuarios!
        </h2>
      </template>

      <UTabs :items="items" class="w-full">
        <template #default="{ item, index, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

            <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

            <span
              v-if="selected"
              class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
            />
          </div>
        </template>

        <template #user.add="{ item }">
          <UCard>
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Agregue un nuevo usuario a la base de datos de Picohelsoft.
              </p>
            </template>

            <UForm
              id="user-add-form"
              :schema="userAddSchema"
              :state="userAddFormState"
              @submit="onSubmitUserAdd"
            >
              <UFormGroup
                label="Nombre completo"
                name="name"
                class="mb-3"
                required
              >
                <UInput
                  v-model="userAddFormState.name"
                  size="sm"
                  autofocus
                  autocomplete="off"
                  spellcheck="false"
                />
              </UFormGroup>
              <UFormGroup
                label="Número de documento"
                name="document"
                class="mb-3"
                required
              >
                <UInput
                  v-model="userAddFormState.document"
                  type="number"
                  size="sm"
                  autocomplete="off"
                />
              </UFormGroup>
              <UFormGroup label="Sede" name="location" class="mb-3" required>
                <USelectMenu
                  v-model="userAddFormState.location"
                  :options="locations"
                  placeholder="Seleccione una sede"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="name"
                  by="id"
                  :search-attributes="['name', 'colors']"
                >
                  <template #option="{ option: location }">
                    <span
                      v-for="color in location.colors"
                      :key="color.id"
                      class="h-2 w-2 rounded-full"
                      :class="`bg-${color}-500 dark:bg-${color}-400`"
                    />
                    <span class="truncate">{{ location.name }}</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
            </UForm>

            <template #footer>
              <UButton
                form="user-add-form"
                type="submit"
                color="green"
                variant="outline"
                label="Guardar usuario"
                size="lg"
                icon="i-heroicons-check-circle"
                trailing
              />
            </template>
          </UCard>
        </template>

        <template #user.delete="{ item }">
          <UCard>
            <template #header>
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Elimine el usuario seleccionado de la base de datos de
                Picohelsoft.
              </p>
            </template>

            <UForm
              id="user-delete-form"
              :schema="userDeleteSchema"
              :state="userDeleteFormState"
              @submit="onSubmitUserDelete"
            >
              <UFormGroup label="Usuario" name="user" class="mb-3" required>
                <UInputMenu
                  class="w-64"
                  v-model="userDeleteFormState.user"
                  :options="people"
                >
                  <template #leading>
                    <UIcon
                      v-if="userDeleteFormState.user?.icon"
                      :name="(userDeleteFormState.user.icon as string)"
                      class="w-5 h-5"
                    />
                    <UAvatar
                      v-else-if="userDeleteFormState.user?.avatar"
                      v-bind="(userDeleteFormState.user.avatar as Avatar)"
                      size="2xs"
                    />
                  </template>
                </UInputMenu>
              </UFormGroup>
            </UForm>

            <template #footer>
              <UButton
                form="user-delete-form"
                type="submit"
                color="red"
                variant="outline"
                label="Eliminar"
                icon="i-heroicons-trash"
                size="lg"
                trailing
              />
            </template>
          </UCard>
        </template>

        <template #user.update="{ item }">
          <UCard>
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Actualice los datos de un usuario existente en la base de datos
                de Picohelsoft.
              </p>
            </template>

            <UForm
              id="user-update-form"
              :schema="userUpdateSchema"
              :state="userUpdateFormState"
              @submit="onSubmitUserUpdate"
            >
              <UFormGroup label="Nombre completo" name="name" class="mb-3">
                <UInput
                  v-model="userUpdateFormState.name"
                  size="sm"
                  autofocus
                  autocomplete="off"
                  spellcheck="false"
                />
              </UFormGroup>
              <UFormGroup
                label="Número de documento"
                name="document"
                class="mb-3"
              >
                <UInput
                  v-model="userUpdateFormState.document"
                  type="number"
                  size="sm"
                  autocomplete="off"
                />
              </UFormGroup>
              <UFormGroup label="Sede" name="location" class="mb-3">
                <USelectMenu
                  v-model="userUpdateFormState.location"
                  :options="locations"
                  placeholder="Seleccione una sede"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="name"
                  by="id"
                  :search-attributes="['name', 'colors']"
                >
                  <template #option="{ option: location }">
                    <span
                      v-for="color in location.colors"
                      :key="color.id"
                      class="h-2 w-2 rounded-full"
                      :class="`bg-${color}-500 dark:bg-${color}-400`"
                    />
                    <span class="truncate">{{ location.name }}</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
            </UForm>

            <template #footer>
              <UButton
                form="user-update-form"
                type="submit"
                color="indigo"
                variant="outline"
                label="Actualizar usuario"
                size="lg"
                icon="i-heroicons-pencil"
                trailing
              />
            </template>
          </UCard>
        </template>

        <template #user.query="{ item }">
          <UCard>
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Consultar los datos de un usuario existente y registrar su
                acceso mediante huellas dactilares.
              </p>
            </template>

            <DashboardTable called-from="users" />
          </UCard>
        </template>
      </UTabs>
    </UCard>
  </NuxtLayout>
</template>
