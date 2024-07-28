export function useWorkHour(employeeId: string) {
  return useFetch(`/api/work-hours/${employeeId}`)
}
