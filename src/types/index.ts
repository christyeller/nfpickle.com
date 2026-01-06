import { User, Event, Post, Member, ContactSubmission, SiteSettings } from '@prisma/client'

export type { User, Event, Post, Member, ContactSubmission, SiteSettings }

export type EventType = 'open-play' | 'tournament' | 'clinic' | 'social' | 'meeting'
export type EventStatus = 'published' | 'draft'
export type PostStatus = 'published' | 'draft'
export type MembershipTier = 'free' | 'annual' | 'lifetime'
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

export const membershipTierLabels: Record<MembershipTier, string> = {
  free: 'Community (Free)',
  annual: 'Annual ($25/year)',
  lifetime: 'Lifetime ($200)',
}
