import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, formatTime } from '@/lib/utils'
import { eventTypeLabels, type EventType } from '@/types'
import { Calendar, Clock, MapPin, DollarSign, Users, ArrowLeft } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug } })

  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: `${event.title} | North Fork Pickleball`,
    description: event.description || `Join us for ${event.title}`,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug } })

  if (!event || event.status !== 'published') {
    notFound()
  }

  const isPast = new Date(event.startDate) < new Date()

  return (
    <>
      {/* Hero */}
      <section className="pb-16 bg-[#3893A4]">
        <div className="container-custom">
          <Link
            href="/events"
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Events
          </Link>

          <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
            {eventTypeLabels[event.eventType as EventType] || event.eventType}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
            </div>
          </div>

          {isPast && (
            <div className="mt-4 inline-block px-4 py-2 bg-gray-500/50 text-white rounded-lg">
              This event has passed
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.description ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(event.description, {
                      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3',
                                     'ul', 'ol', 'li', 'blockquote', 'a'],
                      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'align']
                    })
                  }}
                />
              ) : (
                <p className="text-gray-600">
                  Join us for this event! More details coming soon.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Event Details</h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">{event.locationName}</p>
                      {event.locationAddress && (
                        <p className="text-sm text-gray-600">{event.locationAddress}</p>
                      )}
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Calendar size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">{formatDate(event.startDate)}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </p>
                    </div>
                  </li>

                  {event.cost !== null && event.cost !== undefined && (
                    <li className="flex items-start gap-3">
                      <DollarSign size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">
                          {event.cost > 0 ? `$${event.cost.toFixed(2)}` : 'Free'}
                        </p>
                      </div>
                    </li>
                  )}

                  {event.capacity && (
                    <li className="flex items-start gap-3">
                      <Users size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Capacity: {event.capacity}</p>
                      </div>
                    </li>
                  )}

                  {event.isRecurring && event.recurringPattern && (
                    <li className="text-sm text-gray-600 bg-primary/5 p-3 rounded-lg">
                      This is a recurring event ({event.recurringPattern})
                    </li>
                  )}
                </ul>

                {event.registrationRequired && !isPast && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                      Registration is required for this event.
                    </p>
                    <Link href="/contact" className="btn btn-primary w-full">
                      Contact to Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
