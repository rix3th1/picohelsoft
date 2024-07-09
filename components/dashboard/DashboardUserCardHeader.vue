<script setup lang="ts">
import type { Gender } from '@prisma/client'

const props = defineProps<{
  gender: Gender
}>()

const src = computed(() => {
  switch (props.gender) {
    case 'MALE':
      return '/img/avatars/male/1.png'
    case 'FEMALE':
      return `/img/avatars/female/${Math.floor(Math.random() * 3) + 1}.png`
    default:
      return '/img/avatars/male/1.png'
  }
})
</script>

<template>
  <div class="flex justify-center gap-x-5">
    <img :src="src" alt="user" class="w-2/5 h-2/5 rounded-full" />
  </div>
</template>
