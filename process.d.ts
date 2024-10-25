declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL?: string
    DATABASE_URL?: string
    ADMIN_USERNAME?: string
    ADMIN_PASSWORD?: string
    ADMIN_RESTRICTED_ACCESS_KEY?: string
    CLOUDINARY_CLOUD_NAME?: string
    CLOUDINARY_API_KEY?: string
    CLOUDINARY_API_SECRET?: string
    SETTLEMENT_VALUE_PER_HOUR?: string
  }
}
