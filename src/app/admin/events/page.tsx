'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { eventTypeLabels, type EventType } from '@/types'
import type { Event } from '@prisma/client'

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('status', filter)

      const res = await fetch(`/api/events?${params}`)
      const data = await res.json()
      setEvents(data.events)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (event: Event) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"?`)) return

    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setEvents(events.filter((e) => e.id !== event.id))
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'eventType',
      label: 'Type',
      render: (event: Event) => eventTypeLabels[event.eventType as EventType] || event.eventType,
    },
    {
      key: 'startDate',
      label: 'Date',
      render: (event: Event) => formatDate(event.startDate),
    },
    {
      key: 'status',
      label: 'Status',
      render: (event: Event) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            event.status === 'published'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {event.status}
        </span>
      ),
    },
  ]

  return (
    <div>
      <AdminHeader title="Events" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['all', 'published', 'draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm rounded-lg capitalize ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <Link href="/admin/events/new" className="btn btn-primary">
            <Plus size={20} className="mr-2" />
            Add Event
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={events}
              onEdit={(event) => router.push(`/admin/events/${event.id}`)}
              onDelete={handleDelete}
              emptyMessage="No events found"
            />
          )}
        </div>
      </div>
    </div>
  )
}
