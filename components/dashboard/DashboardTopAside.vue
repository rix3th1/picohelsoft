<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const ui = {
  font: 'uppercase',
  active:
    'text-purple-700 before:bg-purple-100 dark:text-white dark:before:bg-purple-500',
  inactive:
    'text-purple-500 hover:text-purple-700 hover:before:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-500 dark:hover:before:bg-purple-300/10',
  icon: {
    active: 'text-purple-700 dark:text-white',
    inactive:
      'text-purple-500 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-500'
  }
}

const links1: VerticalNavigationLink[] = [
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
    to: '/dashboard/cv'
  },
  {
    label: 'Gestión de usuarios',
    icon: 'i-heroicons-users',
    to: '/dashboard/users'
  },
  {
    label: 'Liquidaciones',
    icon: 'i-heroicons-currency-dollar',
    to: '/dashboard/payments'
  }
]
</script>

<template>
  <div class="flex-grow">
    <UVerticalNavigation :links="links1" :ui="ui" />
  </div>
</template>
