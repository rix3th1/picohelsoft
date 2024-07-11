import {
  v2,
  type UploadApiErrorResponse,
  type UploadApiResponse
} from 'cloudinary'

function configCloudinary() {
  const {
    cloudinary: { cloudName, apiKey, apiSecret }
  } = useRuntimeConfig()

  v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })
}

export async function uploadFile(
  file: File
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  configCloudinary()

  return new Promise((resolve, reject) => {
    v2.uploader
      .upload_stream((error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
      .end(buffer)
  })
}
