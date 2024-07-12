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
    class="flex items-center justify-between p-4 bg-purple-500 shadow-md shadow-purple-500/50"
  >
    <div class="flex items-center">
      <UTooltip text="Abrir menú" @click="isOpen = true">
        <img
          src="/logo.png"
          alt="Logo"
          class="w-12 h-12 rounded-full mr-4 cursor-pointer"
        />
      </UTooltip>
      <span class="text-white text-xl font-semibold">PICOHELSOFT</span>
    </div>
    <div>
      <button class="bg-purple-700 text-white px-4 py-2 rounded">
        PICOHELSOFT
      </button>
    </div>
  </nav>

  <USlideover v-model="isOpen" prevent-close side="left" appear>
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
            class="text-xl font-semibold leading-6 text-gray-900 dark:text-white"
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

      <DashboardMainAside />
    </UCard>
  </USlideover>
</template>
