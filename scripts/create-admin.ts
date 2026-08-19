import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before running this script')
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      hashedPassword,
      name: 'Christy',
      role: 'admin',
      updatedAt: new Date(),
    },
    create: {
      id: randomUUID(),
      email,
      hashedPassword,
      name: 'Christy',
      role: 'admin',
      updatedAt: new Date(),
    },
  })

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      id: 'settings',
      clubName: 'North Fork Pickleball Club',
      tagline: 'Serving the North Fork Valley of Colorado',
      primaryLocation: 'Paonia Town Park',
      contactEmail: 'info@northforkpickleball.com',
    },
  })

  console.log('Admin user created:', user.email)
  console.log('Default site settings created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
