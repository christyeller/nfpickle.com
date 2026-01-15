'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventFormData } from '@/lib/validations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import RichTextEditor from '@/components/admin/RichTextEditor/RichTextEditor'

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventType: 'open-play',
      locationName: 'Paonia Town Park',
      cost: 0,
      status: 'published',
      registrationRequired: false,
      isRecurring: false,
      description: '',
    },
  })

  const isRecurring = watch('isRecurring')

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        const result = await res.json()
        setError(result.error || 'Error creating event')
      }
    } catch {
      setError('Error creating event')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <AdminHeader title="Create New Event" />

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

            <div className="flex gap-4 pt-4">
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
          </form>
        </div>
      </div>
    </div>
  )
}
