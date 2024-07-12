export function useEmployeesFilter() {
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

  return {
    employees,
    q,
    filteredRows
  }
}
