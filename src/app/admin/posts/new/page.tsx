'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostFormData } from '@/lib/validations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import RichTextEditor from '@/components/admin/RichTextEditor/RichTextEditor'
import FeaturedImagePicker from '@/components/admin/FeaturedImagePicker'

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      status: 'published',
      content: '',
    },
  })

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/posts')
      } else {
        const result = await res.json()
        setError(result.error || 'Error creating post')
      }
    } catch {
      setError('Error creating post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <AdminHeader title="Create New Post" />

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
              <input {...register('title')} className="input" />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label">Excerpt</label>
              <textarea
                {...register('excerpt')}
                rows={2}
                className="input"
                placeholder="A short summary of the post (optional)"
              />
            </div>

            <Controller
              name="featuredImageId"
              control={control}
              render={({ field }) => (
                <FeaturedImagePicker
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div>
              <label className="label">Content *</label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write your post content..."
                    features={{ basic: true, lists: true, links: true, images: true, advanced: true }}
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
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
                {isSubmitting ? 'Saving...' : 'Save Post'}
              </button>
              <Link href="/admin/posts" className="btn btn-ghost">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
