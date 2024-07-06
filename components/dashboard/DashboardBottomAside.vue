<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const links2 = [
  {
    label: 'Horarios laborales',
    icon: 'i-heroicons-calendar',
    to: '/dashboard/work-hours'
  },
  {
    label: 'Cerrar sesión',
    icon: 'i-heroicons-arrow-left-start-on-rectangle'
  }
] as VerticalNavigationLink[]

const ui = {
  font: 'uppercase',
  active: 'text-purple-700 before:bg-purple-100',
  inactive: 'text-purple-500 hover:text-purple-700 hover:before:bg-purple-50',
  icon: {
    active: 'text-purple-700',
    inactive: 'text-purple-500 group-hover:text-purple-700'
  }
}
</script>

<template>
  <div class="mt-auto">
    <UVerticalNavigation :links="links2" :ui="ui" />
  </div>
</template>
