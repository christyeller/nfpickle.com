import { User, Event, Post, Member, ContactSubmission, SiteSettings, Donation } from '@prisma/client'

export type { User, Event, Post, Member, ContactSubmission, SiteSettings, Donation }

export type EventType = 'open-play' | 'tournament' | 'clinic' | 'social' | 'meeting'
export type EventStatus = 'published' | 'draft'
export type PostStatus = 'published' | 'draft'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export const eventTypeLabels: Record<EventType, string> = {
  'open-play': 'Open Play',
  tournament: 'Tournament',
  clinic: 'Clinic/Lesson',
  social: 'Social Event',
  meeting: 'Meeting',
}

export const skillLevelLabels: Record<SkillLevel, string> = {
  beginner: 'Beginner (2.0-2.5)',
  intermediate: 'Intermediate (3.0-3.5)',
  advanced: 'Advanced (4.0+)',
}

export type DonationType = 'one-time' | 'recurring'
export type DonationFrequency = 'monthly' | 'yearly'
export type DonationStatus = 'pending' | 'completed' | 'failed' | 'cancelled'
export type PaymentStatus = 'incomplete' | 'processing' | 'succeeded' | 'failed'

export const donationTypeLabels: Record<DonationType, string> = {
  'one-time': 'One-Time',
  'recurring': 'Recurring',
}

export const donationFrequencyLabels: Record<DonationFrequency, string> = {
  'monthly': 'Monthly',
  'yearly': 'Yearly',
}

export const donationStatusLabels: Record<DonationStatus, string> = {
  'pending': 'Pending',
  'completed': 'Completed',
  'failed': 'Failed',
  'cancelled': 'Cancelled',
}

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  'incomplete': 'Incomplete',
  'processing': 'Processing',
  'succeeded': 'Succeeded',
  'failed': 'Failed',
}
