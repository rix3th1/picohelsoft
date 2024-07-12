<script setup lang="ts">
const columns = useDashboardWorkHoursTableColumns()

const { filteredRows, q } = useEmployeesFilter()

const page = ref(1)
const pageCount = 5
</script>

<template>
  <div>
    <div
      class="flex justify-start py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput
        id="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="md"
        trailing
        v-model="q"
        placeholder="Buscar usuario..."
      />
    </div>

    <UTable :rows="filteredRows ?? []" :columns="columns" ref="dataTable" />

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
