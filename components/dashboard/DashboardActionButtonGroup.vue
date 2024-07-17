<script setup lang="ts">
const { filteredRows } = defineProps<{
  filteredRows: any[]
}>()

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { utils, writeFile } from 'xlsx'

const toast = useToast()

const columns = useDashboardWorkHoursTableColumns()

const colLabels = Object.values(columns).map((col) => col.label)
const rowLabel = (row: any) => Object.values(row).join(',') + '\n'

const exportCSV = () => {
  let csv = colLabels.join(',') + '\n'
  filteredRows.forEach((row) => {
    csv += rowLabel(row)
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'usuarios.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportExcel = () => {
  const ws = utils.json_to_sheet(filteredRows)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Usuarios')
  writeFile(wb, 'usuarios.xlsx')
}

const exportPDF = () => {
  const doc = new jsPDF()
  const tableData = filteredRows?.map((row: any) =>
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
  const textToCopy = filteredRows
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
  <UButtonGroup size="xs" class="py-5">
    <UButton
      color="indigo"
      variant="outline"
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
      label="XLSX"
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
</template>
