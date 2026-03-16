import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadToR2, getR2Key, generateUniqueFilename } from '@/lib/r2'
import { randomUUID } from 'crypto'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024 // 25MB for documents

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
]

const ALL_ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES]

function getMediaType(mimeType: string): 'IMAGE' | 'DOCUMENT' {
  return ALLOWED_IMAGE_TYPES.includes(mimeType) ? 'IMAGE' : 'DOCUMENT'
}

function getR2Folder(mediaType: 'IMAGE' | 'DOCUMENT'): string {
  return mediaType === 'DOCUMENT' ? 'documents' : 'content'
}

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
    if (!ALL_ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF, PDF, Word, Excel, TXT, CSV' },
        { status: 400 }
      )
    }

    const mediaType = getMediaType(file.type)
    const maxSize = mediaType === 'DOCUMENT' ? MAX_DOCUMENT_SIZE : MAX_FILE_SIZE

    // Validate file size
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024)
      return NextResponse.json(
        { error: `File too large. Maximum size is ${maxMB}MB` },
        { status: 400 }
      )
    }

    // Convert file to buffer for R2
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename and R2 key
    const uniqueFilename = generateUniqueFilename(file.name)
    const folder = getR2Folder(mediaType)
    const r2Key = getR2Key(folder, uniqueFilename)

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
        id: randomUUID(),
        r2Key,
        url,
        secureUrl: url,
        format,
        bytes: file.size,
        mediaType,
        originalName: file.name,
        updatedAt: new Date(),
        ...(user?.id && { uploadedBy: user.id }),
      },
    })

    return NextResponse.json({ media }, { status: 201 })
  } catch (error) {
    console.error('Error uploading media:', error)
    const message = error instanceof Error ? error.message : 'Failed to upload media'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
