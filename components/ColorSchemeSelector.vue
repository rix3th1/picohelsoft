<template>
  <div class="fixed bottom-0 right-0 p-4">
    <ColorScheme>
      <USelect
        id="color-scheme"
        v-model="$colorMode.preference"
        :options="[
          {
            label: 'Sistema',
            value: 'system'
          },
          {
            label: 'Claro',
            value: 'light'
          },
          {
            label: 'Oscuro',
            value: 'dark'
          }
        ]"
        size="lg"
      />
    </ColorScheme>
  </div>
</template>
