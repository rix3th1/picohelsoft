export function useDashboardTablePeople() {
  return useFetch('/api/work-hours', {
    transform: (workHours) => {
      return workHours.map((workHour) => ({
        id: workHour.employeeId,
        employeeName: workHour.employee.name,
        document: workHour.employee.document,
        locationName: workHour.employee.location.name,
        startTime: new Date(workHour.startTime).toLocaleTimeString('es-CO'),
        endTime: workHour.endTime
          ? new Date(workHour.endTime).toLocaleTimeString('es-CO')
          : undefined
      }))
    }
  })
}
