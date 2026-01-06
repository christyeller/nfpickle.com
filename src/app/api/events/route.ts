import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { eventSchema } from '@/lib/validations'
import { generateSlug } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const upcoming = searchParams.get('upcoming')
    const limit = searchParams.get('limit')

    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (upcoming === 'true') {
      where.startDate = { gte: new Date() }
      where.status = 'published'
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: upcoming === 'true' ? 'asc' : 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = eventSchema.parse(body)

    const slug = generateSlug(validatedData.title)

    // Check for existing slug
    const existingEvent = await prisma.event.findUnique({ where: { slug } })
    const finalSlug = existingEvent ? `${slug}-${Date.now()}` : slug

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        slug: finalSlug,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
      },
    })

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
