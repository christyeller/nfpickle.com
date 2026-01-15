'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventFormData } from '@/lib/validations'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import type { Event } from '@prisma/client'
import RichTextEditor from '@/components/admin/RichTextEditor/RichTextEditor'
import FeaturedImagePicker from '@/components/admin/FeaturedImagePicker'

export default function EditEventPage() {
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
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  })

  const isRecurring = watch('isRecurring')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`)
        const data = await res.json()

        if (data.event) {
          const event: Event = data.event
          reset({
            title: event.title,
            eventType: event.eventType as EventFormData['eventType'],
            startDate: new Date(event.startDate).toISOString().slice(0, 16),
            endDate: new Date(event.endDate).toISOString().slice(0, 16),
            locationName: event.locationName,
            locationAddress: event.locationAddress || '',
            description: event.description || '',
            capacity: event.capacity || undefined,
            cost: event.cost || 0,
            registrationRequired: event.registrationRequired,
            isRecurring: event.isRecurring,
            recurringPattern: event.recurringPattern || undefined,
            featuredImageId: event.featuredImageId || null,
            status: event.status as EventFormData['status'],
          })
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        setError('Error loading event')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id, reset])

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        const result = await res.json()
        setError(result.error || 'Error updating event')
      }
    } catch {
      setError('Error updating event')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/events')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Edit Event" />
        <div className="p-6 text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title="Edit Event" />

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
              <label className="label">Event Type *</label>
              <select {...register('eventType')} className="input">
                <option value="open-play">Open Play</option>
                <option value="tournament">Tournament</option>
                <option value="clinic">Clinic/Lesson</option>
                <option value="social">Social Event</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Start Date *</label>
                <input type="datetime-local" {...register('startDate')} className="input" />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                )}
              </div>
              <div>
                <label className="label">End Date *</label>
                <input type="datetime-local" {...register('endDate')} className="input" />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="label">Location *</label>
              <input {...register('locationName')} className="input" />
            </div>

            <div>
              <label className="label">Address</label>
              <input {...register('locationAddress')} className="input" placeholder="Optional street address" />
            </div>

            <div>
              <label className="label">Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Describe the event..."
                    features={{ basic: true, lists: true, links: true, images: false, advanced: false }}
                    minHeight="200px"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Capacity</label>
                <input
                  type="number"
                  {...register('capacity', { valueAsNumber: true })}
                  className="input"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div>
                <label className="label">Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('cost', { valueAsNumber: true })}
                  className="input"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('registrationRequired')} className="rounded" />
                <span>Registration Required</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('isRecurring')} className="rounded" />
                <span>Recurring Event</span>
              </label>
            </div>

            {isRecurring && (
              <div>
                <label className="label">Recurring Pattern</label>
                <select {...register('recurringPattern')} className="input">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}

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
                  {isSubmitting ? 'Saving...' : 'Save Event'}
                </button>
                <Link href="/admin/events" className="btn btn-ghost">
                  Cancel
                </Link>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                className="btn text-red-600 hover:bg-red-50"
              >
                Delete Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
