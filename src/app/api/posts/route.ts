import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validations'
import { generateSlug } from '@/lib/utils'
import { randomUUID } from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      where.status = status
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = postSchema.parse(body)

    const slug = generateSlug(validatedData.title)

    const existingPost = await prisma.post.findUnique({ where: { slug } })
    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { featuredImageId, ...restData } = validatedData

    const post = await prisma.post.create({
      data: {
        id: randomUUID(),
        ...restData,
        slug: finalSlug,
        updatedAt: new Date(),
        ...(featuredImageId && { featuredImageId }),
      },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
