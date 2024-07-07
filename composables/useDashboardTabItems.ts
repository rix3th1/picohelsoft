import type { TabItem } from '#ui/types'

export function useDashboardTabItems(): TabItem[] {
  return [
    {
      slot: 'user.add',
      label: 'Añadir usuario',
      icon: 'i-heroicons-user-plus'
    },
    {
      slot: 'user.delete',
      label: 'Eliminar usuario',
      icon: 'i-heroicons-user-minus'
    },
    {
      slot: 'user.update',
      label: 'Actualizar usuario',
      icon: 'i-heroicons-user-circle'
    },
    {
      slot: 'user.query',
      label: 'Consultar usuario',
      icon: 'i-heroicons-eye'
    }
  ]
}
