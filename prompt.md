# North Fork Pickleball Club - Build From Scratch

## Project Overview

Build a pickleball club website for the North Fork Valley of Colorado (Paonia, Hotchkiss, Crawford) with a custom admin panel. No CMS framework - just Next.js, React forms, and a PostgreSQL database.

**Design Reference:** https://usapickleball.org - Professional sports organization look

---

## Tech Stack

```
Framework:     Next.js 16 (App Router)
Styling:       Tailwind CSS
Database:      Neon PostgreSQL (connection string provided)
ORM:           Prisma
Auth:          NextAuth.js (Credentials provider)
Forms:         React Hook Form + Zod validation
Deployment:    Vercel
```

---

## Database Connection

```
DATABASE_URL="postgresql://neondb_owner:npg_Pemdx3sh6cTb@ep-young-brook-adrzkheo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

Create `.env` file with this connection string.

---

## Project Setup

```bash
# Create new Next.js project
npx create-next-app@latest north-fork-pickleball --typescript --tailwind --eslint --app --src-dir

cd north-fork-pickleball

# Install dependencies
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install react-hook-form @hookform/resolvers zod
npm install bcryptjs
npm install @types/bcryptjs --save-dev
npm install lucide-react
npm install date-fns

# Initialize Prisma
npx prisma init
```

---

## Database Schema

**File: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  hashedPassword String
  name           String?
  role           String    @default("admin")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

model Event {
  id                   String   @id @default(cuid())
  title                String
  slug                 String   @unique
  eventType            String   @default("open-play")
  description          String?  @db.Text
  startDate            DateTime
  endDate              DateTime
  locationName         String   @default("Paonia Town Park")
  locationAddress      String?
  capacity             Int?
  cost                 Float?   @default(0)
  registrationRequired Boolean  @default(false)
  isRecurring          Boolean  @default(false)
  recurringPattern     String?
  status               String   @default("published")
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String   @db.Text
  featuredImg String?
  status      String   @default("published")
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Member {
  id               String   @id @default(cuid())
  email            String   @unique
  firstName        String
  lastName         String
  phone            String?
  skillLevel       String?
  membershipTier   String   @default("free")
  membershipStatus String   @default("active")
  joinedAt         DateTime @default(now())
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model SiteSettings {
  id              String  @id @default("settings")
  clubName        String  @default("North Fork Pickleball Club")
  tagline         String  @default("Serving the North Fork Valley of Colorado")
  contactEmail    String?
  facebookUrl     String?
  instagramUrl    String?
  primaryLocation String  @default("Paonia Town Park")
  aboutText       String? @db.Text
}
```

After creating schema:
```bash
npx prisma db push
npx prisma generate
```

---

## Project Structure

```
src/
├── app/
│   ├── (public)/                 # Public pages (no layout prefix)
│   │   ├── page.tsx              # Homepage
│   │   ├── events/
│   │   │   ├── page.tsx          # Events list
│   │   │   └── [slug]/page.tsx   # Single event
│   │   ├── news/
│   │   │   ├── page.tsx          # News/blog list
│   │   │   └── [slug]/page.tsx   # Single post
│   │   ├── about/page.tsx
│   │   ├── play/page.tsx         # Courts, schedule, rules
│   │   ├── membership/page.tsx
│   │   ├── contact/page.tsx
│   │   └── donate/page.tsx
│   │
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/page.tsx        # Login page
│   │   ├── events/
│   │   │   ├── page.tsx          # List events
│   │   │   ├── new/page.tsx      # Create event form
│   │   │   └── [id]/page.tsx     # Edit event form
│   │   ├── posts/
│   │   │   ├── page.tsx          # List posts
│   │   │   ├── new/page.tsx      # Create post form
│   │   │   └── [id]/page.tsx     # Edit post form
│   │   ├── members/
│   │   │   └── page.tsx          # List members
│   │   ├── messages/
│   │   │   └── page.tsx          # Contact submissions
│   │   └── settings/
│   │       └── page.tsx          # Site settings
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── events/
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/route.ts     # GET one, PUT, DELETE
│   │   ├── posts/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── members/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── contact/route.ts      # POST contact form
│   │   └── settings/route.ts     # GET/PUT settings
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css
│
├── components/
│   ├── public/                   # Public site components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── EventCard.tsx
│   │   ├── PostCard.tsx
│   │   └── ...
│   │
│   ├── admin/                    # Admin components
│   │   ├── Sidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── DataTable.tsx
│   │   ├── FormField.tsx
│   │   └── ...
│   │
│   └── ui/                       # Shared UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Textarea.tsx
│       ├── Card.tsx
│       └── ...
│
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   └── utils.ts                  # Helper functions
│
└── types/
    └── index.ts                  # TypeScript types
```

---

## Authentication Setup

**File: `src/lib/prisma.ts`**

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**File: `src/lib/auth.ts`**

```typescript
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}
```

**File: `src/app/api/auth/[...nextauth]/route.ts`**

```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

---

## Create Initial Admin User

**File: `scripts/create-admin.ts`**

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('your-secure-password-here', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@northforkpickleball.com' },
    update: {},
    create: {
      email: 'admin@northforkpickleball.com',
      hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  
  console.log('Admin user created:', user.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run with: `npx ts-node scripts/create-admin.ts`

Or add to package.json scripts:
```json
"scripts": {
  "create-admin": "npx ts-node scripts/create-admin.ts"
}
```

---

## Admin Panel Design

### Login Page (`/admin/login`)

Simple centered card with:
- Logo/title: "North Fork Pickleball Admin"
- Email input
- Password input
- "Sign In" button
- Error message display

### Admin Layout

Sidebar navigation:
- Dashboard (home icon)
- Events (calendar icon)
- Posts (newspaper icon)
- Members (users icon)
- Messages (mail icon)
- Settings (gear icon)
- Logout

Top bar:
- "North Fork Pickleball" title
- User email display
- Logout button

### Dashboard (`/admin`)

Quick stats cards:
- Total Events
- Total Members
- Unread Messages
- Published Posts

Recent activity:
- Latest 5 events
- Latest 5 contact submissions

### Events List (`/admin/events`)

- "Add Event" button (top right)
- Table with columns: Title, Type, Date, Status, Actions
- Actions: Edit, Delete
- Filter by status (All, Published, Draft)

### Event Form (`/admin/events/new` and `/admin/events/[id]`)

Form fields:
```
Title*          [text input]
Event Type*     [select: Open Play, Tournament, Clinic, Social, Meeting]
Start Date*     [datetime picker]
End Date*       [datetime picker]
Location Name*  [text input, default "Paonia Town Park"]
Address         [text input]
Description     [textarea]
Capacity        [number input, optional]
Cost ($)        [number input, default 0]
Registration Required  [checkbox]
Is Recurring    [checkbox]
Recurring Pattern [select: Weekly, Bi-weekly, Monthly - show if recurring]
Status*         [select: Published, Draft]
```

Buttons:
- "Save Event" (primary)
- "Cancel" (secondary, goes back)
- "Delete" (danger, only on edit page)

### Posts List & Form

Similar pattern to Events:
- Title*
- Content* (textarea, could use simple markdown)
- Excerpt (short description)
- Status (Published, Draft)

### Members List (`/admin/members`)

Table showing:
- Name
- Email
- Skill Level
- Membership Tier
- Joined Date

Actions: View, Delete (no edit - members manage themselves)

### Messages (`/admin/messages`)

List of contact form submissions:
- Name
- Email
- Subject
- Date
- Read/Unread status

Click to view full message, mark as read

### Settings (`/admin/settings`)

Form for site-wide settings:
- Club Name
- Tagline
- Contact Email
- Facebook URL
- Instagram URL
- Primary Location
- About Text (textarea)

---

## Public Site Design

**Reference: https://usapickleball.org**

### Color Palette

```css
:root {
  --color-primary: #0B4F6C;
  --color-primary-light: #01BAEF;
  --color-primary-dark: #083D54;
  --color-secondary: #E85D04;
  --color-accent: #2D6A4F;
  --color-dark: #1B1B1E;
  --color-dark-blue: #0A1628;
  --color-white: #FFFFFF;
  --color-gray-100: #F8F9FA;
  --color-gray-300: #DEE2E6;
  --color-gray-500: #6C757D;
  --color-gray-700: #495057;
  --color-gray-900: #212529;
}
```

### Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap');

body {
  font-family: 'Public Sans', sans-serif;
}
```

### Header Component

- Sticky on scroll
- Logo: "North Fork Pickleball" (text, no image needed)
- Nav links: Home, Play, Events, Membership, About, Contact
- Mobile: Hamburger menu
- CTA button: "Join Club"

### Footer Component

- Dark background
- Logo and tagline
- Quick links
- Contact info
- Social media icons
- Copyright

### Homepage Sections

1. **Hero**
   - Full viewport height
   - Gradient background (or placeholder image)
   - Large headline: "Pickleball is for Everyone"
   - Subheadline: "Join the North Fork Valley's growing pickleball community"
   - Two buttons: "Join the Club", "View Events"

2. **Quick Stats**
   - Dark background
   - 4 stats in a row: Members, Courts, Weekly Sessions, Skill Levels

3. **About Preview**
   - "Welcome to North Fork Pickleball"
   - Short intro text
   - "Learn More" link

4. **Upcoming Events**
   - "Upcoming Events" heading
   - Grid of 3 event cards (pull from database)
   - "View All Events" button

5. **Membership CTA**
   - Dark gradient background
   - "Join Our Community"
   - 3 tier cards: Free, Annual ($25), Lifetime ($200)

6. **News Preview**
   - Latest 3 posts
   - "View All News" link

### Events Page (`/events`)

- Grid of event cards
- Each card shows: Date badge, Title, Time, Location, Type tag
- Click to view details

### Single Event (`/events/[slug]`)

- Hero with title and date
- Description
- Details sidebar: Time, Location, Cost, Capacity
- Back to events link

### Play Page (`/play`)

- Court locations section
- Open play schedule
- Skill level descriptions (Beginner, Intermediate, Advanced)
- Basic rules overview

### About Page

- Club story/history
- Mission statement
- Location info with embedded Google Map

### Contact Page

- Contact form (Name, Email, Subject, Message)
- Contact info
- Map

### Membership Page

- Benefits overview
- Tier comparison
- Join form or link

---

## API Routes Structure

### Events API

**GET `/api/events`** - List all events (public)
```typescript
// Query params: status, limit, upcoming (boolean)
// Returns: { events: Event[] }
```

**POST `/api/events`** - Create event (admin only)
```typescript
// Body: Event data
// Returns: { event: Event }
```

**GET `/api/events/[id]`** - Get single event
**PUT `/api/events/[id]`** - Update event (admin only)
**DELETE `/api/events/[id]`** - Delete event (admin only)

### Posts API

Same pattern as events

### Members API

**GET `/api/members`** - List members (admin only)
**POST `/api/members`** - Create member (public - join form)
**DELETE `/api/members/[id]`** - Delete member (admin only)

### Contact API

**POST `/api/contact`** - Submit contact form (public)
**GET `/api/contact`** - List submissions (admin only)

### Settings API

**GET `/api/settings`** - Get settings (public)
**PUT `/api/settings`** - Update settings (admin only)

---

## Form Validation with Zod

**File: `src/lib/validations.ts`**

```typescript
import { z } from 'zod'

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  eventType: z.enum(['open-play', 'tournament', 'clinic', 'social', 'meeting']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  locationName: z.string().min(1, 'Location is required'),
  locationAddress: z.string().optional(),
  description: z.string().optional(),
  capacity: z.number().optional(),
  cost: z.number().default(0),
  registrationRequired: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringPattern: z.string().optional(),
  status: z.enum(['published', 'draft']).default('published'),
})

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
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
  membershipTier: z.enum(['free', 'annual', 'lifetime']).default('free'),
})
```

---

## Example Admin Form Component

**File: `src/app/admin/events/new/page.tsx`**

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema } from '@/lib/validations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventType: 'open-play',
      locationName: 'Paonia Town Park',
      cost: 0,
      status: 'published',
      registrationRequired: false,
      isRecurring: false,
    }
  })

  const isRecurring = watch('isRecurring')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (res.ok) {
        router.push('/admin/events')
      } else {
        alert('Error creating event')
      }
    } catch (error) {
      alert('Error creating event')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            {...register('title')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Event Type *</label>
          <select
            {...register('eventType')}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="open-play">Open Play</option>
            <option value="tournament">Tournament</option>
            <option value="clinic">Clinic/Lesson</option>
            <option value="social">Social Event</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date *</label>
            <input
              type="datetime-local"
              {...register('startDate')}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date *</label>
            <input
              type="datetime-local"
              {...register('endDate')}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            {...register('locationName')}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium mb-1">Cost ($)</label>
          <input
            type="number"
            step="0.01"
            {...register('cost', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('registrationRequired')} />
            <span>Registration Required</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isRecurring')} />
            <span>Recurring Event</span>
          </label>
        </div>

        {/* Recurring Pattern - show only if isRecurring */}
        {isRecurring && (
          <div>
            <label className="block text-sm font-medium mb-1">Recurring Pattern</label>
            <select
              {...register('recurringPattern')}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status *</label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
```

---

## Environment Variables

**File: `.env`**

```
DATABASE_URL="postgresql://neondb_owner:npg_Pemdx3sh6cTb@ep-young-brook-adrzkheo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="generate-a-random-secret-here-use-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Implementation Order

### Phase 1: Setup & Auth
1. Create Next.js project
2. Install dependencies
3. Set up Prisma schema and push to database
4. Configure NextAuth
5. Create admin user script
6. Build login page
7. Test login flow

### Phase 2: Admin Panel
1. Create admin layout with sidebar
2. Build dashboard page
3. Create Events CRUD (list, new, edit, delete)
4. Create Posts CRUD
5. Create Members list
6. Create Messages list
7. Create Settings page

### Phase 3: Public Frontend
1. Create Header component
2. Create Footer component
3. Build Homepage with all sections
4. Build Events page (list + single)
5. Build News page (list + single)
6. Build Play page
7. Build About page
8. Build Contact page with form
9. Build Membership page

### Phase 4: Polish
1. Mobile responsiveness
2. Loading states
3. Error handling
4. SEO meta tags
5. Final styling adjustments

---

## Deployment to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
4. Deploy

---

## Admin Credentials

After running the create-admin script:

- **URL:** https://yoursite.com/admin
- **Email:** admin@northforkpickleball.com
- **Password:** (whatever you set in the script)

---

## CRITICAL REMINDERS

✅ **DO:**
- Make the public site look like usapickleball.org
- Keep admin forms simple and clear
- Make everything mobile responsive
- Handle loading and error states
- Generate slugs automatically from titles
- Validate all form inputs

❌ **DO NOT:**
- Use any CMS framework
- Overcomplicate the admin UI
- Skip authentication on admin routes
- Forget to protect API routes

---

## Local Context

**Service Area:** Paonia, Hotchkiss, Crawford, Delta (North Fork Valley, Colorado)

**Primary Court:** Paonia Town Park

**Default Event Types:**
- Open Play (most common)
- Tournament
- Clinic/Lesson
- Social Event
- Meeting

**Membership Tiers:**
- Community (Free) - Newsletter, event info
- Annual ($25/year) - Full member benefits
- Lifetime ($200) - Permanent membership

---

This is a straightforward Next.js app with React forms. No CMS magic, no complex config - just code you control.