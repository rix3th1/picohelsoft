import type { VerticalNavigationLink } from '#ui/types'

export function useDashboardBottomAsideLinks(): VerticalNavigationLink[] {
  return [
    {
      label: 'Horarios laborales',
      icon: 'i-heroicons-calendar',
      to: '/dashboard/work-hours'
    },
    {
      label: 'Cerrar sesión',
      icon: 'i-heroicons-arrow-left-start-on-rectangle'
    }
  ]
}
