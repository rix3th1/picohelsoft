import type { VerticalNavigationLink } from '#ui/types'

export function useDashboardTopAsideLinks(): VerticalNavigationLink[] {
  return [
    {
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/dashboard'
    },
    {
      label: 'Registro de horarios',
      icon: 'i-heroicons-calendar',
      to: '/dashboard/schedule-register'
    },
    {
      label: 'Hojas de vida',
      icon: 'i-heroicons-identification',
      click: () => requestAdminAccess('/dashboard/cv')
    },
    {
      label: 'Gestión de usuarios',
      icon: 'i-heroicons-users',
      click: () => requestAdminAccess('/dashboard/users')
    },
    {
      label: 'Liquidaciones',
      icon: 'i-heroicons-currency-dollar',
      click: () => requestAdminAccess('/dashboard/payments')
    }
  ]
}
