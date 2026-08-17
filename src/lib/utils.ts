export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  })
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} at ${formatTime(date)}`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * For a recurring event, rolls startDate/endDate forward by the recurring
 * pattern until the occurrence hasn't ended yet, so a single stored event
 * keeps showing as upcoming instead of falling into Past Events after its
 * first date passes. Non-recurring events are returned unchanged.
 */
export function getNextOccurrence(
  startDate: Date,
  endDate: Date,
  isRecurring: boolean,
  recurringPattern: string | null,
  now: Date = new Date()
): { startDate: Date; endDate: Date } {
  if (!isRecurring || !recurringPattern) {
    return { startDate, endDate }
  }

  let start = new Date(startDate)
  let end = new Date(endDate)

  const advance = (date: Date): Date => {
    const next = new Date(date)
    if (recurringPattern === 'weekly') {
      next.setUTCDate(next.getUTCDate() + 7)
    } else if (recurringPattern === 'biweekly') {
      next.setUTCDate(next.getUTCDate() + 14)
    } else if (recurringPattern === 'monthly') {
      next.setUTCMonth(next.getUTCMonth() + 1)
    } else {
      next.setUTCDate(next.getUTCDate() + 7)
    }
    return next
  }

  // Advance in whole cycles while the occurrence has fully ended, so an
  // event currently in progress (started but not yet over) still shows.
  while (end <= now) {
    start = advance(start)
    end = advance(end)
  }

  return { startDate: start, endDate: end }
}
