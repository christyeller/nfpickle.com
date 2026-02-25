import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const handler = NextAuth(authOptions)

// Wrap POST handler with rate limiting for login attempts
async function rateLimitedPost(request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  const params = await context.params
  // Only rate limit the actual sign-in attempt
  if (params.nextauth?.includes('callback') && params.nextauth?.includes('credentials')) {
    const ip = getClientIp(request)
    const { success, response } = await rateLimit(ip, 'login')
    if (!success) return response!
  }

  return handler(request, context)
}

export { handler as GET, rateLimitedPost as POST }
