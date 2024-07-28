<script setup lang="ts">
const slideover = useSlideover()
</script>

<template>
  <USlideover side="left">
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
            @click="slideover.close()"
          />
        </div>
      </template>

      <DashboardMainAside class="py-5" />
    </UCard>
  </USlideover>
</template>
