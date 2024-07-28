import type { VerticalNavigationLink } from '#ui/types'
import { useAuthStore } from '~/store/auth'

export function useDashboardBottomAsideLinks(): VerticalNavigationLink[] {
  const { signOut } = useAuthStore()

  const router = useRouter()

  const logout = () => {
    signOut()
    router.push('/')
  }

  return [
    {
      label: 'Horarios laborales',
      icon: 'i-heroicons-calendar',
      to: '/dashboard/work-hours',
      click: () => closeNavSlideover()
    },
    {
      label: 'Cerrar sesión',
      icon: 'i-heroicons-arrow-left-start-on-rectangle',
      click: () => logout()
    }
  ]
}
