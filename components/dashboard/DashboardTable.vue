<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const props = defineProps({
  calledFrom: {
    type: String,
    required: true
  }
})

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'role',
    label: 'Role'
  },
  {
    key: 'actions'
  }
]

const people = [
  {
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  },
  {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
  },
  {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
  },
  {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
  }
]

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = 5

const items = (row: (typeof people)[0]): DropdownItem[][] => [
  [
    {
      label: 'Registrar huella',
      icon: 'i-heroicons-finger-print-20-solid',
      click: () => alert(`Registrar huella de ${row.name}`)
    }
  ]
]
</script>

<template>
  <div>
    <div
      class="flex justify-end py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        trailing
        v-model="q"
        placeholder="Buscar usuario..."
      />
    </div>

    <UTable :rows="filteredRows" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="people.length"
      />
    </div>
  </div>
</template>
