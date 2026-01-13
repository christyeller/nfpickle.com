'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'

interface PageFormData {
  title: string
  content: string
  metaTitle?: string
  metaDescription?: string
  status: string
}

export default function NewPagePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageFormData>({
    defaultValues: {
      status: 'published',
    },
  })

  const onSubmit = async (data: PageFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/pages')
      } else {
        const result = await res.json()
        setError(result.error || 'Error creating page')
      }
    } catch {
      setError('Error creating page')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <AdminHeader title="Create New Page" />

      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="label">Title *</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="input"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label">Content *</label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={12}
                className="input font-mono text-sm"
                placeholder="Write your page content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div>
              <label className="label">Meta Title (SEO)</label>
              <input
                {...register('metaTitle')}
                className="input"
                placeholder="Leave empty to use page title"
              />
            </div>

            <div>
              <label className="label">Meta Description (SEO)</label>
              <textarea
                {...register('metaDescription')}
                rows={2}
                className="input"
                placeholder="A short description for search engines"
              />
            </div>

            <div>
              <label className="label">Status *</label>
              <select {...register('status')} className="input">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Page'}
              </button>
              <Link href="/admin/pages" className="btn btn-ghost">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
