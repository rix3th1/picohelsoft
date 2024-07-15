export function useDashboardWorkHoursTableColumns() {
  return [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'employeeName',
      label: 'Nombre completo'
    },
    {
      key: 'locationName',
      label: 'Sede'
    },
    {
      key: 'document',
      label: 'Número de documento'
    },
    {
      key: 'startTime',
      label: 'Horario de inicio'
    },
    {
      key: 'endTime',
      label: 'Horario de salida'
    }
  ]
}
