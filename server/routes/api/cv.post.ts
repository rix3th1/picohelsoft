import { uploadFile } from '~/lib/cloudinary'

export default defineEventHandler(async (event) => {
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
})
