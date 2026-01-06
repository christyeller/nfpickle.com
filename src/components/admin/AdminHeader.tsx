'use client'

import { useSession } from 'next-auth/react'

interface AdminHeaderProps {
  title: string
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {session?.user?.email && (
          <div className="text-sm text-gray-600">
            Logged in as <span className="font-medium">{session.user.email}</span>
          </div>
        )}
      </div>
    </header>
  )
}
