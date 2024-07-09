<script setup lang="ts">
const columns = useDashboardWorkHoursTableColumns()
const { data: employees } = useDashboardTablePeople()

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

    <UTable :rows="[...filteredRows]" :columns="columns" />
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
