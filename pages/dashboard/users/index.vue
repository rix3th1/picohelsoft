<script setup lang="ts">
const items = [
  {
    slot: 'user.add',
    label: 'Añadir usuario',
    icon: 'i-heroicons-user-plus'
  },
  {
    slot: 'user.delete',
    label: 'Eliminar usuario',
    icon: 'i-heroicons-user-minus'
  },
  {
    slot: 'user.update',
    label: 'Actualizar usuario',
    icon: 'i-heroicons-user-circle'
  },
  {
    slot: 'user.query',
    label: 'Consultar usuario',
    icon: 'i-heroicons-eye'
  }
]

const campuses = [
  { id: 1, name: 'Espinal Centro', colors: ['red', 'yellow'] },
  { id: 2, name: 'Espinal Pijaos Mall', colors: ['blue', 'yellow'] },
  { id: 3, name: 'Ibagué', colors: ['green', 'blue'] }
]

const userAddForm = reactive({
  name: '',
  document: '',
  campus: ''
})
const userDeleteForm = reactive({
  currentPassword: '',
  newPassword: ''
})
const userUpdateForm = reactive({
  name: '',
  document: '',
  campus: ''
})

function onSubmitAccount() {
  console.log('Submitted form:', userAddForm)
}

function onSubmitPassword() {
  console.log('Submitted form:', userDeleteForm)
}

import type { Avatar } from '#ui/types'

const people = [
  {
    id: 'benjamincanac',
    label: 'benjamincanac',
    href: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
  },
  {
    id: 'Atinux',
    label: 'Atinux',
    href: 'https://github.com/Atinux',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
  },
  {
    id: 'smarroufin',
    label: 'smarroufin',
    href: 'https://github.com/smarroufin',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
  },
  {
    id: 'nobody',
    label: 'Nobody',
    icon: 'i-heroicons-user-circle'
  }
]

const selected = ref(people[0])
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
          <UCard @submit.prevent="onSubmitAccount">
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

            <UFormGroup label="Nombre completo" name="name" class="mb-3">
              <UInput v-model="userAddForm.name" />
            </UFormGroup>
            <UFormGroup
              label="Número de documento"
              name="document"
              class="mb-3"
            >
              <UInput v-model="userAddForm.document" />
            </UFormGroup>
            <UFormGroup label="Sede" name="campus" class="mb-3">
              <USelectMenu
                v-model="userAddForm.campus"
                :options="campuses"
                placeholder="Seleccione una sede"
                searchable
                searchable-placeholder="Buscar por nombre o color"
                option-attribute="name"
                by="id"
                :search-attributes="['name', 'colors']"
              >
                <template #option="{ option: campus }">
                  <span
                    v-for="color in campus.colors"
                    :key="color.id"
                    class="h-2 w-2 rounded-full"
                    :class="`bg-${color}-500 dark:bg-${color}-400`"
                  />
                  <span class="truncate">{{ campus.name }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>

            <template #footer>
              <UButton
                type="submit"
                color="green"
                variant="outline"
                size="lg"
                icon="i-heroicons-check-circle"
                trailing
              >
                Guardar usuario
              </UButton>
            </template>
          </UCard>
        </template>

        <template #user.delete="{ item }">
          <UCard @submit.prevent="onSubmitPassword">
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

            <UInputMenu class="w-64" v-model="selected" :options="people">
              <template #leading>
                <UIcon
                  v-if="selected.icon"
                  :name="(selected.icon as string)"
                  class="w-5 h-5"
                />
                <UAvatar
                  v-else-if="selected.avatar"
                  v-bind="(selected.avatar as Avatar)"
                  size="2xs"
                />
              </template>
            </UInputMenu>

            <template #footer>
              <UButton
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
          <UCard @submit.prevent="onSubmitAccount">
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

            <UFormGroup label="Nombre completo" name="name" class="mb-3">
              <UInput v-model="userUpdateForm.name" />
            </UFormGroup>
            <UFormGroup
              label="Número de documento"
              name="document"
              class="mb-3"
            >
              <UInput v-model="userUpdateForm.document" />
            </UFormGroup>
            <UFormGroup label="Sede" name="campus" class="mb-3">
              <USelectMenu
                v-model="userUpdateForm.campus"
                :options="campuses"
                placeholder="Seleccione una sede"
                searchable
                searchable-placeholder="Buscar por nombre o color"
                option-attribute="name"
                by="id"
                :search-attributes="['name', 'colors']"
              >
                <template #option="{ option: campus }">
                  <span
                    v-for="color in campus.colors"
                    :key="color.id"
                    class="h-2 w-2 rounded-full"
                    :class="`bg-${color}-500 dark:bg-${color}-400`"
                  />
                  <span class="truncate">{{ campus.name }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>

            <template #footer>
              <UButton
                type="submit"
                color="indigo"
                variant="outline"
                size="lg"
                icon="i-heroicons-pencil"
                trailing
              >
                Actualizar usuario
              </UButton>
            </template>
          </UCard>
        </template>

        <template #user.query="{ item }">
          <UCard @submit.prevent="onSubmitAccount">
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

      <template #footer> </template>
    </UCard>
  </NuxtLayout>
</template>
