import { RateLimiterMemory } from 'rate-limiter-flexible'
import { NextResponse } from 'next/server'

// Rate limiters for different endpoints
const limiters = {
  // Login: 5 attempts per minute
  login: new RateLimiterMemory({
    points: 5,
    duration: 60,
  }),

  // Contact form: 3 submissions per minute
  contact: new RateLimiterMemory({
    points: 3,
    duration: 60,
  }),

  // Donations: 5 attempts per minute
  donations: new RateLimiterMemory({
    points: 5,
    duration: 60,
  }),

  // API general: 60 requests per minute
  api: new RateLimiterMemory({
    points: 60,
    duration: 60,
  }),
}

export type LimiterType = keyof typeof limiters

export async function rateLimit(
  ip: string,
  type: LimiterType = 'api'
): Promise<{ success: boolean; response?: NextResponse }> {
  try {
    await limiters[type].consume(ip)
    return { success: true }
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      ),
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return '127.0.0.1'
}
