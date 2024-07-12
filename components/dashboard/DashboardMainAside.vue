<script setup lang="ts">
const isOpen = useModalAccessOpen()
const toast = useToast()
const router = useRouter()
const isLoading = ref(false)

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  key: z
    .string({
      message: 'La clave de acceso es obligatoria',
      required_error: 'La clave de acceso es obligatoria'
    })
    .min(4, 'La clave de acceso debe tener al menos 4 caracteres')
})

type Schema = z.infer<typeof schema>

const state = reactive({
  key: undefined
})
console.log(state.key)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { key } = event.data
  isLoading.value = true
  try {
    const response = await $fetch('/api/restricted-access-keys', {
      method: 'POST',
      body: {
        key
      }
    })

    if (response.verified) {
      toast.add({
        color: 'green',
        title: 'Acceso a la sección de administración',
        description: 'Ahora puedes acceder a la sección de administración'
      })
      router.push(isOpen.value.to)
      isOpen.value.isOpen = false
      return
    }

    toast.add({
      color: 'red',
      title: 'Error al acceder a la sección de administración',
      description: 'La clave de acceso no es correcta'
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        color: 'red',
        title: 'Error al acceder a la sección de administración',
        description: error.message
      })
    }
  } finally {
    isOpen.value.isOpen = false
    isLoading.value = false
    state.key = undefined
  }
}
</script>

<template>
  <aside
    class="flex flex-col h-[calc(100vh-5rem)] w-80 py-5 bg-neutral-200/30 dark:bg-neutral-500/20 border-r border-neutral-300/50 dark:border-neutral-700/50"
  >
    <UModal
      v-model="isOpen.isOpen"
      prevent-close
      :ui="{
        overlay: {
          background: 'bg-transparent backdrop-blur-md'
        }
      }"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Acceso restringido a administradores de Picohelsoft
            </h3>
          </div>
        </template>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-5"
          @submit="onSubmit"
        >
          <UFormGroup name="key">
            <UInput
              id="key"
              v-model="state.key"
              type="password"
              placeholder="Llave de acceso"
              size="xl"
              icon="i-heroicons-lock-closed"
              autocomplete="off"
              autofocus
            />
          </UFormGroup>
          <UButton
            type="submit"
            block
            color="primary"
            size="xl"
            icon="i-heroicons-key"
            :loading="isLoading"
          >
            Aceptar
          </UButton>
        </UForm>
      </UCard>
    </UModal>
    <DashboardTopAside />
    <DashboardBottomAside />
  </aside>
</template>
