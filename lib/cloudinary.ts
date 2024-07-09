import {
  v2 as cloudinary,
  type UploadApiErrorResponse,
  type UploadApiResponse
} from 'cloudinary'

export async function uploadFile(
  file: File
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
      .end(buffer)
  })
}
