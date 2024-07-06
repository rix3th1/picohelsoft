<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const ui = {
  font: 'uppercase',
  active: 'text-purple-700 before:bg-purple-100',
  inactive: 'text-purple-500 hover:text-purple-700 hover:before:bg-purple-50',
  icon: {
    active: 'text-purple-700',
    inactive: 'text-purple-500 group-hover:text-purple-700'
  }
}

const links1 = [
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
] as VerticalNavigationLink[]
</script>

<template>
  <div class="flex-grow">
    <UVerticalNavigation :links="links1" :ui="ui" />
  </div>
</template>
