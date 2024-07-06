<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede tener más de 50 caracteres'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  username: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
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
    <UInput
      id="password"
      v-model="state.password"
      type="password"
      placeholder="Contraseña"
      size="xl"
      icon="i-heroicons-lock-closed"
      autocomplete="current-password"
    />
    <UButton block type="submit" color="primary" size="xl"> Aceptar </UButton>
  </UForm>
</template>
