<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const columns = useDashboardEmployeesTableColumns()
const { data: employees } = await useDashboardEmployees()

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return employees.value
  }

  return employees.value?.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = 5

const isOpen = useModalNewSecurityPinOpen()

const employeeIdAux = useEmployeeId()

async function register2FA(employeeId: string) {
  isOpen.value.isOpen = true
  employeeIdAux.value = employeeId
}

const items = (row: any): DropdownItem[][] => [
  [
    {
      label: 'Crear pin de seguridad',
      icon: 'i-heroicons-lock-closed',
      click: () => register2FA(row.id)
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
        id="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        trailing
        v-model="q"
        placeholder="Buscar usuario..."
      />
    </div>

    <UTable :rows="filteredRows ?? []" :columns="columns">
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
        :total="filteredRows?.length ?? 0"
      />
    </div>
  </div>
</template>
