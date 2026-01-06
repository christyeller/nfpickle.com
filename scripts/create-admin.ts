import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const user = await prisma.user.upsert({
    where: { email: 'admin@northforkpickleball.com' },
    update: {},
    create: {
      email: 'admin@northforkpickleball.com',
      hashedPassword,
      name: 'Admin',
      role: 'admin',
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
  console.log('Password: admin123')
  console.log('Default site settings created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
