<script setup lang="ts">
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Papa from 'papaparse'
import { computed, ref } from 'vue'
import { utils, writeFile } from 'xlsx'

const columns = useDashboardWorkHoursTableColumns()
const { data: employees } = useDashboardTablePeople()

const q = ref('')
const toast = useToast()

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

const exportCSV = () => {
  const csv = Papa.unparse(filteredRows.value as any)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'usuarios.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportExcel = () => {
  const ws = utils.json_to_sheet(filteredRows.value as any)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Usuarios')
  writeFile(wb, 'usuarios.xlsx')
}

const exportPDF = () => {
  const doc = new jsPDF()
  const tableData = filteredRows.value?.map((row: any) =>
    columns.map((col) => row[col.key])
  )

  doc.autoTable({
    head: [columns.map((col) => col.label)],
    body: tableData
  })

  doc.save('usuarios.pdf')
}

const printTable = () => {
  window.print()
}

const copyToClipboard = () => {
  const textToCopy = filteredRows.value
    ?.map((row: any) => columns.map((col) => row[col.key]).join('\t'))
    .join('\n')
  navigator.clipboard
    .writeText(textToCopy ?? '')
    .then(() => {
      toast.add({
        title: 'Copiado al portapapeles',
        description: 'Los datos se han copiado correctamente al portapapeles.',
        color: 'green'
      })
    })
    .catch(() => {
      toast.add({
        title: 'Error al copiar al portapapeles',
        description: 'No se pudo copiar los datos al portapapeles.',
        color: 'red'
      })
    })
}
</script>

<template>
  <div>
    <UButtonGroup size="xl">
      <UButton
        color="indigo"
        variant="outline"
        label="Copiar"
        icon="i-heroicons-clipboard-document-solid"
        trailing
        @click="copyToClipboard"
      />
      <UButton
        color="indigo"
        variant="outline"
        label="CSV"
        icon="i-heroicons-document-text"
        trailing
        @click="exportCSV"
      />
      <UButton
        color="indigo"
        variant="outline"
        label="Excel"
        icon="i-heroicons-document-chart-bar"
        trailing
        @click="exportExcel"
      />
      <UButton
        color="indigo"
        variant="outline"
        label="PDF"
        icon="i-heroicons-document-arrow-down"
        trailing
        @click="exportPDF"
      />
      <UButton
        color="indigo"
        variant="outline"
        label="Imprimir"
        icon="i-heroicons-printer"
        trailing
        @click="printTable"
      />
    </UButtonGroup>

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

    <UTable :rows="[...filteredRows]" :columns="columns" ref="dataTable" />

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
