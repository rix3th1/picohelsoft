export async function useEmployeesFilter() {
  const { data: employees } = await useDashboardTablePeople()
  const { q, filteredRows } = useFilterEmployees(employees)

  return {
    employees,
    q,
    filteredRows
  }
}
