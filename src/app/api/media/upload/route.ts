import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadToR2, getR2Key, generateUniqueFilename } from '@/lib/r2'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer for R2
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename and R2 key
    const uniqueFilename = generateUniqueFilename(file.name)
    const r2Key = getR2Key('content', uniqueFilename)

    // Upload to R2
    const url = await uploadToR2(buffer, r2Key, file.type)

    // Get user ID from session
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    })

    // Get file format from mime type
    const format = file.type.split('/')[1]

    // Save to database
    const media = await prisma.media.create({
      data: {
        r2Key,
        url,
        secureUrl: url,
        format,
        bytes: file.size,
        uploadedBy: user?.id,
      },
    })

    return NextResponse.json({ media }, { status: 201 })
  } catch (error) {
    console.error('Error uploading media:', error)
    const message = error instanceof Error ? error.message : 'Failed to upload media'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
