<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { signIn } = useAuthStore()
const { authenticated, loading } = storeToRefs(useAuthStore())

const router = useRouter()

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { useAuthStore } from '~/store/auth'

const schema = z.object({
  username: z
    .string({ message: 'El campo nombre es obligatorio' })
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede tener más de 50 caracteres'),
  password: z
    .string({ message: 'El campo contraseña es obligatorio' })
    .min(8, 'El campo contraseña debe tener al menos 8 caracteres')
})

type Schema = z.output<typeof schema>

const state = reactive({
  username: undefined,
  password: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { username, password } = event.data
  try {
    await signIn({ username, password })

    if (authenticated) {
      router.push('/dashboard')

      toast.add({
        title: 'Sesión iniciada',
        description: 'Ahora puedes acceder a tus funciones de gestión.',
        color: 'green'
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error })

      toast.add({
        title: 'Error al iniciar sesión',
        description: 'El usuario o la contraseña son incorrectos',
        color: 'orange'
      })
    }
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
    <UFormGroup name="username">
      <UInput
        id="username"
        v-model="state.username"
        placeholder="Usuario"
        size="xl"
        icon="i-heroicons-user"
        autofocus
        autocomplete="username"
        spellcheck="false"
        :disabled="loading"
      />
    </UFormGroup>
    <UFormGroup name="password">
      <UInput
        id="password"
        v-model="state.password"
        type="password"
        placeholder="Contraseña"
        size="xl"
        icon="i-heroicons-lock-closed"
        autocomplete="current-password"
        :disabled="loading"
      />
    </UFormGroup>
    <UButton type="submit" block color="primary" size="xl" :loading="loading">
      Aceptar
    </UButton>
  </UForm>
</template>
