'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Page } from '@prisma/client'

export default function PagesPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPages()
  }, [filter])

  const fetchPages = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('status', filter)

      const res = await fetch(`/api/pages?${params}`)
      const data = await res.json()
      setPages(data.pages || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
      setPages([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (page: Page) => {
    if (!confirm(`Are you sure you want to delete "${page.title}"?`)) return

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setPages(pages.filter((p) => p.id !== page.id))
      }
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      render: (page: Page) => formatDate(page.updatedAt),
    },
    {
      key: 'status',
      label: 'Status',
      render: (page: Page) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            page.status === 'published'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {page.status}
        </span>
      ),
    },
  ]

  return (
    <div>
      <AdminHeader title="Pages" />

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
          <Link href="/admin/pages/new" className="btn btn-primary">
            <Plus size={20} className="mr-2" />
            Add Page
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <DataTable
            data={pages}
            columns={columns}
            onEdit={(page) => router.push(`/admin/pages/${page.id}`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
