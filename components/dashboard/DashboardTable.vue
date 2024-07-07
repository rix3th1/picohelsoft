<script setup lang="ts">
defineProps<{ calledFrom: string }>()

import type { DropdownItem } from '#ui/types'

const columns = useDashboardTableColumns()
const people = useDashboardTablePeople()

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
        :total="filteredRows.length"
      />
    </div>
  </div>
</template>
