import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/AdminHeader'
import StatsCard from '@/components/admin/StatsCard'
import { Calendar, Users, Mail, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const [eventsCount, membersCount, unreadMessagesCount, postsCount, recentEvents, recentMessages] =
    await Promise.all([
      prisma.event.count(),
      prisma.member.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.post.count({ where: { status: 'published' } }),
      prisma.event.findMany({
        orderBy: { startDate: 'desc' },
        take: 5,
      }),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

  return (
    <div>
      <AdminHeader title="Dashboard" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Events"
            value={eventsCount}
            icon={Calendar}
            color="primary"
          />
          <StatsCard
            title="Total Members"
            value={membersCount}
            icon={Users}
            color="accent"
          />
          <StatsCard
            title="Unread Messages"
            value={unreadMessagesCount}
            icon={Mail}
            color="secondary"
          />
          <StatsCard
            title="Published Posts"
            value={postsCount}
            icon={Newspaper}
            color="gray"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Events</h2>
              <Link href="/admin/events" className="text-primary text-sm hover:underline">
                View all
              </Link>
            </div>
            {recentEvents.length === 0 ? (
              <p className="text-gray-500 text-sm">No events yet</p>
            ) : (
              <ul className="space-y-3">
                {recentEvents.map((event) => (
                  <li key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(event.startDate)}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        event.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {event.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Messages</h2>
              <Link href="/admin/messages" className="text-primary text-sm hover:underline">
                View all
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet</p>
            ) : (
              <ul className="space-y-3">
                {recentMessages.map((message) => (
                  <li key={message.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {message.subject || message.message.substring(0, 50)}
                      </p>
                    </div>
                    {!message.read && (
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
