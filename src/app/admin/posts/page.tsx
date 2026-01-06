'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post } from '@prisma/client'

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('status', filter)

      const res = await fetch(`/api/posts?${params}`)
      const data = await res.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (post: Post) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== post.id))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'publishedAt',
      label: 'Published',
      render: (post: Post) => formatDate(post.publishedAt),
    },
    {
      key: 'status',
      label: 'Status',
      render: (post: Post) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            post.status === 'published'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {post.status}
        </span>
      ),
    },
  ]

  return (
    <div>
      <AdminHeader title="Posts" />

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
          <Link href="/admin/posts/new" className="btn btn-primary">
            <Plus size={20} className="mr-2" />
            Add Post
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={posts}
              onEdit={(post) => router.push(`/admin/posts/${post.id}`)}
              onDelete={handleDelete}
              emptyMessage="No posts found"
            />
          )}
        </div>
      </div>
    </div>
  )
}
