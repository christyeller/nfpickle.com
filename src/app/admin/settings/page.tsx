'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { settingsSchema, type SettingsFormData } from '@/lib/validations'
import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()

        if (data.settings) {
          reset({
            clubName: data.settings.clubName || '',
            tagline: data.settings.tagline || '',
            contactEmail: data.settings.contactEmail || '',
            facebookUrl: data.settings.facebookUrl || '',
            instagramUrl: data.settings.instagramUrl || '',
            primaryLocation: data.settings.primaryLocation || '',
            aboutText: data.settings.aboutText || '',
          })
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [reset])

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error saving settings')
      }
    } catch {
      setMessage('Error saving settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Settings" />
        <div className="p-6 text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title="Settings" />

      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
          {message && (
            <div
              className={`p-3 rounded-lg text-sm mb-6 ${
                message.includes('Error')
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-600'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="label">Club Name *</label>
              <input {...register('clubName')} className="input" />
              {errors.clubName && (
                <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>
              )}
            </div>

            <div>
              <label className="label">Tagline</label>
              <input
                {...register('tagline')}
                className="input"
                placeholder="A short description of your club"
              />
            </div>

            <div>
              <label className="label">Contact Email</label>
              <input
                type="email"
                {...register('contactEmail')}
                className="input"
                placeholder="info@example.com"
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
              )}
            </div>

            <div>
              <label className="label">Primary Location</label>
              <input
                {...register('primaryLocation')}
                className="input"
                placeholder="Paonia Town Park"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Facebook URL</label>
                <input
                  {...register('facebookUrl')}
                  className="input"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="label">Instagram URL</label>
                <input
                  {...register('instagramUrl')}
                  className="input"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>

            <div>
              <label className="label">About Text</label>
              <textarea
                {...register('aboutText')}
                rows={6}
                className="input"
                placeholder="Tell visitors about your club..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
