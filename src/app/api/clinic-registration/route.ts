import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { Resend } from 'resend'

const registrationSchema = z.object({
  parentName: z.string().min(1, 'Parent name is required').max(200),
  parentEmail: z.string().email('Invalid email address'),
  parentPhone: z.string().min(1, 'Phone number is required').max(30),
  childName: z.string().min(1, "Child's name is required").max(200),
  childAge: z.string().min(1, "Child's age is required").max(10),
  message: z.string().max(2000).optional(),
  eventTitle: z.string(),
})

const CONTACT_EMAILS = (process.env.CONTACT_EMAIL || 'northforkpickleball@gmail.com')
  .split(',')
  .map(email => email.trim())
  .filter(email => email.length > 0)

// POST - public endpoint for registering
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = registrationSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = result.data

    const registration = await prisma.clinicRegistration.create({
      data: {
        id: randomUUID(),
        parentName: data.parentName.trim(),
        parentEmail: data.parentEmail.toLowerCase().trim(),
        parentPhone: data.parentPhone.trim(),
        childName: data.childName.trim(),
        childAge: data.childAge.trim(),
        message: data.message?.trim() || null,
        eventTitle: data.eventTitle,
      },
    })

    // Send notification email
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'North Fork Pickleball <info@nfpickle.com>'

        await resend.emails.send({
          from: fromEmail,
          to: CONTACT_EMAILS,
          subject: `Clinic Registration: ${data.childName} for ${data.eventTitle}`,
          html: `
            <h2>New Clinic Registration</h2>
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <hr>
            <p><strong>Parent Name:</strong> ${data.parentName}</p>
            <p><strong>Parent Email:</strong> ${data.parentEmail}</p>
            <p><strong>Parent Phone:</strong> ${data.parentPhone}</p>
            <p><strong>Child's Name:</strong> ${data.childName}</p>
            <p><strong>Child's Age:</strong> ${data.childAge}</p>
            ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
          `,
        })

        // Send confirmation to parent
        await resend.emails.send({
          from: fromEmail,
          to: [data.parentEmail],
          subject: `Registration Confirmed: ${data.eventTitle}`,
          html: `
            <h2>Registration Confirmed!</h2>
            <p>Thank you for registering <strong>${data.childName}</strong> for the <strong>${data.eventTitle}</strong>.</p>
            <p>We've received your registration and look forward to seeing ${data.childName} at the clinic!</p>
            <hr>
            <p><strong>Registered Child:</strong> ${data.childName} (Age ${data.childAge})</p>
            <p><strong>Parent/Guardian:</strong> ${data.parentName}</p>
            <hr>
            <p>If you have any questions, please don't hesitate to reach out.</p>
            <p>With gratitude,<br><strong>North Fork Pickleball Club</strong></p>
          `,
        })
      } catch (emailError) {
        console.error('Error sending registration emails:', emailError)
      }
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating clinic registration:', error)
    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    )
  }
}

// GET - admin only
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const registrations = await prisma.clinicRegistration.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ registrations })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}
