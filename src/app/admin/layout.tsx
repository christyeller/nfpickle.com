import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Sidebar from '@/components/admin/Sidebar'
import Providers from '@/components/Providers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Allow login page to render without session
  // The actual pages will handle auth check
  const isLoginPage = false // This is checked in middleware ideally

  if (!session && !isLoginPage) {
    // We'll let individual pages handle this for now
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-100">
        {session && <Sidebar />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </Providers>
  )
}
