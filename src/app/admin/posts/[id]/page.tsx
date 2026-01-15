'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostFormData } from '@/lib/validations'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import type { Post } from '@prisma/client'
import RichTextEditor from '@/components/admin/RichTextEditor/RichTextEditor'
import FeaturedImagePicker from '@/components/admin/FeaturedImagePicker'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()

        if (data.post) {
          const post: Post = data.post
          reset({
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content,
            featuredImageId: post.featuredImageId || null,
            status: post.status as PostFormData['status'],
          })
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Error loading post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id, reset])

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/posts')
      } else {
        const result = await res.json()
        setError(result.error || 'Error updating post')
      }
    } catch {
      setError('Error updating post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/posts')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Edit Post" />
        <div className="p-6 text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title="Edit Post" />

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

            <div className="flex justify-between pt-4">
              <div className="flex gap-4">
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
              <button
                type="button"
                onClick={handleDelete}
                className="btn text-red-600 hover:bg-red-50"
              >
                Delete Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
