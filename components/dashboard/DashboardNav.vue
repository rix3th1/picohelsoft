<script setup lang="ts">
const isOpen = ref(false)
const modalAccess = useModalAccessOpen()

watch(modalAccess.value, (value) => {
  if (value.isOpen) {
    isOpen.value = false
  }
})
</script>

<template>
  <nav
    class="sticky top-0 w-full z-40 flex items-center justify-between p-4 bg-primary-600/70 shadow-md shadow-primary-500/50 backdrop-blur-md dark:bg-primary-400/80"
  >
    <div class="flex items-center">
      <UTooltip text="Abrir menú" @click="isOpen = true">
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

  <USlideover v-model="isOpen" side="left">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <img src="/logo.png" alt="Logo" class="w-12 h-12 rounded-full" />
          <h3
            class="text-md font-semibold leading-6 text-gray-900 dark:text-white"
          >
            PICOHELSOFT
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <DashboardMainAside class="py-5" />
    </UCard>
  </USlideover>
</template>
