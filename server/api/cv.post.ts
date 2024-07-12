import { uploadFile } from '~/lib/cloudinary'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event)
    const cv = formData.get('cv') as File
    const employeeId = formData.get('employeeId') as string

    const uploadResult = await uploadFile(cv)

    const newCV = await prisma.curriculumVitae.create({
      data: {
        cvUrl: uploadResult?.secure_url,
        employeeId
      }
    })

    return newCV
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
