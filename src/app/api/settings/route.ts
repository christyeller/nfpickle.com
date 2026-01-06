import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { settingsSchema } from '@/lib/validations'

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'settings' },
    })

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'settings',
          clubName: 'North Fork Pickleball Club',
          tagline: 'Serving the North Fork Valley of Colorado',
          primaryLocation: 'Paonia Town Park',
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = settingsSchema.parse(body)

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'settings' },
      update: validatedData,
      create: {
        id: 'settings',
        ...validatedData,
      },
    })

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
