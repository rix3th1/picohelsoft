import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  await prisma.location.deleteMany()
  await prisma.user.deleteMany()
  await prisma.restrictedAccessKey.deleteMany()

  const locations = await prisma.location.createMany({
    data: [
      { name: 'Espinal Centro', colors: ['red', 'yellow'] },
      { name: 'Espinal Pijaos Mall', colors: ['blue', 'yellow'] },
      { name: 'Ibagué', colors: ['green', 'blue'] }
    ]
  })

  const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_RESTRICTED_ACCESS_KEY } =
    process.env

  const adminUser = await prisma.user.create({
    data: {
      username: ADMIN_USERNAME!,
      hashedPassword: await argon2.hash(ADMIN_PASSWORD!)
    }
  })

  const restrictedAccessKeys = await prisma.restrictedAccessKey.create({
    data: {
      key: ADMIN_RESTRICTED_ACCESS_KEY!,
      userId: adminUser.id
    }
  })

  console.info({ locations, adminUser, restrictedAccessKeys })
}

try {
  await main()
} catch (error) {
  console.error({ error })
  process.exit(1)
} finally {
  await prisma.$disconnect()
  process.exit(0)
}
