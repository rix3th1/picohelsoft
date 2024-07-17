export function useEmployeesFilter() {
  const { data: employees } = useDashboardTablePeople()
  const { q, filteredRows } = useFilterEmployees(employees)

  return {
    employees,
    q,
    filteredRows
  }
}
