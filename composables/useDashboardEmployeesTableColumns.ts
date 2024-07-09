export function useDashboardEmployeesTableColumns() {
  const columns = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'name',
      label: 'Nombre completo'
    },
    {
      key: 'document',
      label: 'Número de documento'
    },
    {
      key: 'actions'
    }
  ]

  return columns
}
