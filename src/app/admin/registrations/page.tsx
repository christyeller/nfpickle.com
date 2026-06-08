'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'
import { Download } from 'lucide-react'

interface Registration {
  id: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName: string
  childAge: string
  message: string | null
  eventTitle: string
  createdAt: string
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/clinic-registration')
      const data = await res.json()
      setRegistrations(data.registrations || [])
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (registration: Registration) => {
    if (!confirm(`Remove registration for "${registration.childName}"?`)) return

    try {
      const res = await fetch(`/api/clinic-registration/${registration.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setRegistrations(registrations.filter((r) => r.id !== registration.id))
      }
    } catch (error) {
      console.error('Error deleting registration:', error)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Parent Name', 'Parent Email', 'Parent Phone', 'Child Name', 'Child Age', 'Event', 'Message', 'Registered Date']
    const rows = registrations.map((r) => [
      r.parentName,
      r.parentEmail,
      r.parentPhone,
      r.childName,
      r.childAge,
      r.eventTitle,
      r.message || '',
      new Date(r.createdAt).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clinic-registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const columns = [
    { key: 'childName', label: 'Child' },
    { key: 'childAge', label: 'Age' },
    { key: 'parentName', label: 'Parent' },
    { key: 'parentEmail', label: 'Email' },
    { key: 'parentPhone', label: 'Phone' },
    {
      key: 'createdAt',
      label: 'Registered',
      render: (r: Registration) => formatDate(r.createdAt),
    },
  ]

  return (
    <div>
      <AdminHeader title="Clinic Registrations" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {registrations.length} registration{registrations.length !== 1 ? 's' : ''}
          </p>
          {registrations.length > 0 && (
            <button onClick={handleExportCSV} className="btn btn-primary">
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
              data={registrations}
              onDelete={handleDelete}
              emptyMessage="No clinic registrations yet"
            />
          )}
        </div>
      </div>
    </div>
  )
}
