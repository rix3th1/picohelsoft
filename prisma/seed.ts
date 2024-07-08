import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  await prisma.location.deleteMany()
  await prisma.user.deleteMany()
  await prisma.restrictedAccessKey.deleteMany()

  const locations = await prisma.location.createMany({
    data: [
      { name: 'Espinal Centro' },
      { name: 'Espinal Pijaos Mall' },
      { name: 'Ibagué' }
    ]
  })

  const adminUser = await prisma.user.create({
    data: {
      username: process.env.ADMIN_USERNAME!,
      hashedPassword: await argon2.hash(process.env.ADMIN_PASSWORD!)
    }
  })

  const restrictedAccessKeys = await prisma.restrictedAccessKey.create({
    data: {
      key: process.env.ADMIN_RESTRICTED_ACCESS_KEY!,
      userId: adminUser.id
    }
  })

  console.info({ locations, adminUser, restrictedAccessKeys })
}

await main()
  .catch(async (error) => {
    console.error({ error })
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
