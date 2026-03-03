import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations'
import { randomUUID } from 'crypto'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// Simple text sanitization - strip HTML tags (doesn't require jsdom)
function sanitizeText(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim()
}

// Escape HTML entities for safe display in emails
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char])
}

// Support multiple email addresses separated by commas in CONTACT_EMAIL
const CONTACT_EMAILS = (process.env.CONTACT_EMAIL || 'northforkpickleball@gmail.com')
  .split(',')
  .map(email => email.trim())
  .filter(email => email.length > 0)

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messages = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 submissions per minute
    const ip = getClientIp(request)
    const { success, response } = await rateLimit(ip, 'contact')
    if (!success) return response!

    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Sanitize user input to prevent XSS
    const sanitizedData = {
      ...validatedData,
      name: sanitizeText(validatedData.name),
      message: sanitizeText(validatedData.message),
      subject: validatedData.subject ? sanitizeText(validatedData.subject) : undefined,
    }

    const message = await prisma.contactSubmission.create({
      data: {
        id: randomUUID(),
        ...sanitizedData,
      },
    })

    // Send email notification (non-blocking - don't fail submission if email fails)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        // Use verified domain sender, or fallback to Resend's default
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'North Fork Pickleball <onboarding@resend.dev>'
        const result = await resend.emails.send({
          from: fromEmail,
          to: CONTACT_EMAILS,
          replyTo: validatedData.email,
          subject: validatedData.subject || `New Contact Form Message from ${validatedData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(sanitizedData.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
            ${sanitizedData.subject ? `<p><strong>Subject:</strong> ${escapeHtml(sanitizedData.subject)}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(sanitizedData.message).replace(/\n/g, '<br>')}</p>
          `,
        })
        if (result.error) {
          console.error('Resend error:', result.error)
        }
      } catch (emailError) {
        // Log but don't fail - the message is already saved to database
        console.error('Failed to send email notification:', emailError)
      }
    }

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, read } = body

    const message = await prisma.contactSubmission.update({
      where: { id },
      data: { read },
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.contactSubmission.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
