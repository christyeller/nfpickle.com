import { z } from 'zod'

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  eventType: z.enum(['open-play', 'tournament', 'clinic', 'social', 'meeting']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  locationName: z.string().min(1, 'Location is required'),
  locationAddress: z.string().optional(),
  description: z.string().optional(),
  capacity: z.number().optional().nullable(),
  cost: z.number().default(0),
  registrationRequired: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringPattern: z.string().optional().nullable(),
  featuredImageId: z.string().optional().nullable(),
  status: z.enum(['published', 'draft']).default('published'),
})

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featuredImageId: z.string().optional().nullable(),
  status: z.enum(['published', 'draft']).default('published'),
})

export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['published', 'draft']).default('published'),
})

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export const memberSchema = z.object({
  email: z.string().email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
})

export const settingsSchema = z.object({
  clubName: z.string().min(1, 'Club name is required'),
  tagline: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  primaryLocation: z.string().optional(),
  aboutText: z.string().optional(),
})

export const donationSchema = z.object({
  donorName: z.string().min(1, 'Name is required'),
  donorEmail: z.string().email('Invalid email address'),
  donorPhone: z.string().optional(),
  donorMessage: z.string().optional(),
  donorAddress: z.string().optional(),
  amount: z.number().min(1, 'Amount must be at least $1').max(100000, 'Amount cannot exceed $100,000'),
  donationType: z.enum(['one-time', 'recurring']),
  frequency: z.enum(['monthly', 'yearly']).optional(),
})

export type EventFormData = z.infer<typeof eventSchema>
export type PostFormData = z.infer<typeof postSchema>
export type PageFormData = z.infer<typeof pageSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type MemberFormData = z.infer<typeof memberSchema>
export type SettingsFormData = z.infer<typeof settingsSchema>
export type DonationFormData = z.infer<typeof donationSchema>
