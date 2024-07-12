import type { VerticalNavigationLink } from '#ui/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

export function useDashboardBottomAsideLinks(): VerticalNavigationLink[] {
  const { signOut } = useAuthStore()
  const { authenticated } = storeToRefs(useAuthStore())

  const router = useRouter()

  const logout = () => {
    signOut()
    router.push('/')
  }

  return [
    {
      label: 'Horarios laborales',
      icon: 'i-heroicons-calendar',
      to: '/dashboard/work-hours'
    },
    {
      label: 'Cerrar sesión',
      icon: 'i-heroicons-arrow-left-start-on-rectangle',
      click: () => logout()
    }
  ]
}
