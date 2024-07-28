<script setup lang="ts">
import { DashboardDasboardNavSlideover } from '#components'

const slideover = useSlideover()

function openSlideover() {
  slideover.open(DashboardDasboardNavSlideover)
}
</script>

<template>
  <nav
    class="sticky top-0 w-full z-40 flex items-center justify-between p-4 bg-primary-600/70 shadow-md shadow-primary-500/50 backdrop-blur-md dark:bg-primary-400/80"
  >
    <div class="flex items-center">
      <UTooltip text="Abrir menú" @click="openSlideover">
        <img
          src="/logo.png"
          alt="Logo"
          class="w-12 h-12 rounded-full mr-4 cursor-pointer hover:opacity-80 hover:shadow-md transition duration-300 ease-in-out"
        />
      </UTooltip>
      <span class="text-white text-md font-semibold">PICOHELSOFT</span>
    </div>
    <div>
      <button class="bg-primary-500/80 text-white text-md px-4 py-2 rounded">
        PICOHELSOFT
      </button>
    </div>
  </nav>

  <DashboardDasboardNavSlideover />
</template>
