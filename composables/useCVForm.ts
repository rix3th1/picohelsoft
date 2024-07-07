import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

export function useCVForm() {
  const MAX_UPLOAD_SIZE = 1024 * 1024 * 1 // 1 MB
  const ACCEPTED_FILE_TYPES = ['application/pdf']

  const schema = z.object({
    cv: z
      .instanceof(File, { message: 'El archivo debe ser de tipo PDF' })
      .refine(
        (file) => !file || file.size <= MAX_UPLOAD_SIZE,
        'El archivo debe ser menor a 1 MB'
      )
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        'El archivo debe ser de tipo PDF'
      )
  })

  type Schema = z.output<typeof schema>

  const state = reactive({
    cv: undefined
  })

  const onSubmit = (event: FormSubmitEvent<Schema>) => {
    // Do something with data
    console.log(event.data)
  }

  return { schema, state, onSubmit }
}
