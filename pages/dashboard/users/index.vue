<script setup lang="ts">
useSeoMeta({
  title: 'Gestión de usuarios | Picohelsoft',
  description: 'Gestión de los empleados de Picohelsoft.'
})

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const toast = useToast()

const isLoading = ref(false)

const userAddSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      message: 'El nombre debe ser una cadena de texto'
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  document: z
    .number({ message: 'El documento debe ser numérico' })
    .transform((value) => value.toString())
    .refine((value) => value.length >= 8 && value.length <= 10, {
      message: 'El documento debe tener entre 8 y 10 dígitos'
    })
    .refine((value) => !/^[0-9]{0,2}$/.test(value), {
      message: 'El documento debe ser numérico'
    }),
  gender: z.object({}, { message: 'Género es obligatorio' }),
  location: z.object({}, { message: 'Sede es obligatorio' })
})

type UserAddSchema = z.infer<typeof userAddSchema>

const userDeleteSchema = z.object({
  user: z.object({}, { message: 'Usuario es obligatorio' })
})

type UserDeleteSchema = z.infer<typeof userDeleteSchema>

const userUpdateSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      message: 'El nombre debe ser una cadena de texto'
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .optional(),
  document: z
    .number({ message: 'El documento debe ser numérico' })
    .transform((value) => value.toString())
    .refine((value) => value.length >= 8 && value.length <= 10, {
      message: 'El documento debe tener entre 8 y 10 dígitos'
    })
    .refine((value) => !/^[0-9]{0,2}$/.test(value), {
      message: 'El documento debe ser numérico'
    })
    .optional(),
  gender: z.object({}, { message: 'Género es obligatorio' }).optional(),
  location: z.object({}, { message: 'Sede es obligatorio' }).optional()
})

type UserUpdateSchema = z.infer<typeof userUpdateSchema>

const items = useDashboardTabItems()
const { data: locations, status: locationsStatus } =
  await usePicoHelsoftLocations()
const { data: employees, refresh: refreshEmployees } =
  await useDashboardEmployees()
const genders = useGenders()

const userAddFormState = reactive({
  name: '',
  document: '',
  gender: '',
  location: locations.value?.[0]
})
const userDeleteFormState = reactive({
  user: employees.value?.[0]
})
const userUpdateFormState = reactive({
  name: '',
  document: '',
  gender: '',
  location: locations.value?.[0]
})

watch(userDeleteFormState, () => {
  const employee = employees.value?.find(
    (employee) => employee.id === userDeleteFormState.user?.id
  )

  userUpdateFormState.name = employee?.name || ''
  userUpdateFormState.document = employee?.document || ''
  userUpdateFormState.gender = genders.find(
    (gender) => gender.id === employee?.gender
  ) as any
  userUpdateFormState.location = locations.value?.find(
    (location) => location.id === employee?.locationId
  )
})

async function onSubmitUserAdd(event: FormSubmitEvent<UserAddSchema>) {
  isLoading.value = true
  const { name, document, location, gender } = event.data
  try {
    const employee = await $fetch('/api/employees', {
      method: 'POST',
      body: {
        name,
        document: document.toString(),
        locationId: (location as { id: string }).id,
        gender: (gender as { id: string }).id
      }
    })

    toast.add({
      title: 'Empleado creado',
      description: employee.name
    })

    userAddFormState.name = ''
    userAddFormState.document = ''
    userAddFormState.location = locations.value?.[0]
    refreshEmployees()
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al crear empleado',
        description: error.message
      })
    }
  } finally {
    isLoading.value = false
  }
}

async function onSubmitUserDelete(event: FormSubmitEvent<UserDeleteSchema>) {
  isLoading.value = true
  const { user } = event.data as any
  try {
    await $fetch(`/api/employees/${user.id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Empleado eliminado',
      description: user.name
    })

    refreshEmployees()
    userDeleteFormState.user = employees.value?.[0]
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al eliminar empleado',
        description: error.message
      })
    }
  } finally {
    isLoading.value = false
  }
}

async function onSubmitUserUpdate(event: FormSubmitEvent<UserUpdateSchema>) {
  isLoading.value = true
  const { name, document, location, gender } = event.data
  try {
    await $fetch(`/api/employees/${userDeleteFormState.user?.id}`, {
      method: 'PATCH',
      body: {
        name,
        document: document?.toString(),
        locationId: (location as { id: string }).id,
        genderId: (gender as { id: string }).id
      }
    })

    toast.add({
      title: 'Empleado actualizado',
      description: userUpdateFormState.name
    })

    refreshEmployees()
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al actualizar empleado',
        description: error.message
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="GESTIÓN DE USUARIOS" />

    <UCard class="w-full">
      <template #header>
        <h2
          class="text-2xl font-semibold leading-10 text-gray-900 dark:text-white"
        >
          Hola, Bienvenido(a) a la sección de gestión de usuarios!
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
                  :disabled="isLoading"
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
                  :disabled="isLoading"
                />
              </UFormGroup>
              <UFormGroup label="Género" name="gender" class="mb-3" required>
                <USelectMenu
                  v-model="userAddFormState.gender"
                  :options="genders ?? []"
                  placeholder="Seleccione un género"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="label"
                  by="value"
                  :search-attributes="['label', 'colors']"
                  :disabled="isLoading"
                >
                  <template #option="{ option: gender }">
                    <span
                      v-for="color in gender.colors"
                      :key="color.id"
                      class="h-2 w-2 rounded-full"
                      :class="`bg-${color}-500 dark:bg-${color}-400`"
                    />
                    <span class="truncate">{{ gender.label }}</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
              <UFormGroup label="Sede" name="location" class="mb-3" required>
                <USelectMenu
                  v-model="userAddFormState.location"
                  :options="locations ?? []"
                  placeholder="Seleccione una sede"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="name"
                  by="id"
                  :search-attributes="['name', 'colors']"
                  :disabled="isLoading"
                  :loading="locationsStatus === 'pending'"
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
                :loading="isLoading"
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
                  :options="
                    employees?.map((employee) => ({
                      id: employee.id,
                      label: employee.name
                    }))
                  "
                  :disabled="isLoading"
                >
                  <template #leading>
                    <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
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
                :loading="isLoading"
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
              <UFormGroup label="Usuario" name="user" class="mb-10" required>
                <UInputMenu
                  class="w-64"
                  v-model="userDeleteFormState.user"
                  :options="
                    employees?.map((employee) => ({
                      id: employee.id,
                      label: employee.name
                    }))
                  "
                  :disabled="isLoading"
                >
                  <template #leading>
                    <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
                  </template>
                </UInputMenu>
              </UFormGroup>
              <UFormGroup label="Nombre completo" name="name" class="mb-3">
                <UInput
                  v-model="userUpdateFormState.name"
                  size="sm"
                  autofocus
                  autocomplete="off"
                  spellcheck="false"
                  :disabled="isLoading"
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
                  :disabled="isLoading"
                />
              </UFormGroup>
              <UFormGroup label="Género" name="gender" class="mb-3">
                <USelectMenu
                  v-model="userUpdateFormState.gender"
                  :options="genders ?? []"
                  placeholder="Seleccione un género"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="label"
                  by="value"
                  :search-attributes="['label', 'colors']"
                  :disabled="isLoading"
                >
                  <template #option="{ option: gender }">
                    <span
                      v-for="color in gender.colors"
                      :key="color.id"
                      class="h-2 w-2 rounded-full"
                      :class="`bg-${color}-500 dark:bg-${color}-400`"
                    />
                    <span class="truncate">{{ gender.label }}</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
              <UFormGroup label="Sede" name="location" class="mb-3">
                <USelectMenu
                  v-model="userUpdateFormState.location"
                  :options="locations ?? []"
                  placeholder="Seleccione una sede"
                  searchable
                  searchable-placeholder="Buscar por nombre o color"
                  option-attribute="name"
                  by="id"
                  :search-attributes="['name', 'colors']"
                  :disabled="isLoading"
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
                :loading="isLoading"
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

            <DashboardEmployeesTable />
          </UCard>
        </template>
      </UTabs>
    </UCard>
  </NuxtLayout>
</template>
