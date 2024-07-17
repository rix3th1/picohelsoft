export function useFilterEmployees(employees: Ref<any[] | null>) {
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
    q,
    filteredRows
  }
}
