<script setup lang="ts">
const { schema, state, onSubmit } = useCVForm()
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardTitle title="HOJAS DE VIDA DE USUARIO" />
    <section class="grid place-items-center grid-cols-4 gap-4 items-center">
      <UCard
        v-for="index in 4"
        :key="index"
        class="w-full max-w-md text-center"
      >
        <template #header>
          <DashboardUserCardHeader />
        </template>

        <DashboardUserCardBody
          title="Leonard Krasner"
          label="Suba aquí su hoja de vida en formato PDF"
        />

        <template #footer>
          <DashboardUserCardFooter>
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="onSubmit"
            >
              <UFormGroup name="cv">
                <UInput
                  id="cv"
                  v-model="state.cv"
                  type="file"
                  accept="application/pdf"
                  icon="i-heroicons-folder"
                  size="md"
                />
              </UFormGroup>

              <UButton
                type="submit"
                color="indigo"
                size="lg"
                icon="i-heroicons-check-circle"
                trailing
              >
                GUARDAR
              </UButton>
            </UForm>
          </DashboardUserCardFooter>
        </template>
      </UCard>
    </section>
  </NuxtLayout>
</template>
