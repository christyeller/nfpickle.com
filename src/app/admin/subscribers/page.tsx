'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'
import { Download } from 'lucide-react'

interface Subscriber {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribers')
      const data = await res.json()
      setSubscribers(data.subscribers || [])
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (subscriber: Subscriber) => {
    if (!confirm(`Remove "${subscriber.email}" from the list?`)) return

    try {
      const res = await fetch(`/api/subscribers/${subscriber.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSubscribers(subscribers.filter((s) => s.id !== subscriber.id))
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error)
    }
  }

  const handleExportCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Subscribed Date']
    const rows = subscribers.map((s) => [
      s.firstName,
      s.lastName,
      s.email,
      new Date(s.createdAt).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'createdAt',
      label: 'Subscribed',
      render: (subscriber: Subscriber) => formatDate(subscriber.createdAt),
    },
  ]

  return (
    <div>
      <AdminHeader title="Email Subscribers" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
          </p>
          {subscribers.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="btn btn-primary"
            >
              <Download size={20} className="mr-2" />
              Export CSV
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={subscribers}
              onDelete={handleDelete}
              emptyMessage="No subscribers yet"
            />
          )}
        </div>
      </div>
    </div>
  )
}
