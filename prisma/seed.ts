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

  const {
    admin: { username, password, restrictedAccessKey }
  } = useRuntimeConfig()

  const adminUser = await prisma.user.create({
    data: {
      username,
      hashedPassword: await argon2.hash(password)
    }
  })

  const restrictedAccessKeys = await prisma.restrictedAccessKey.create({
    data: {
      key: restrictedAccessKey,
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
