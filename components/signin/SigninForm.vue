<script setup lang="ts">
const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

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
  username: '',
  password: ''
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await signIn('github', {
    username: event.data.username,
    password: event.data.password,
    redirect: false
  })

  if (!res.ok) {
    alert('Error al iniciar sesión')
  }

  toast.add({
    title: 'Sesión iniciada'
  })
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
      />
    </UFormGroup>
    <UButton type="submit" block color="primary" size="xl"> Aceptar </UButton>
  </UForm>
</template>
