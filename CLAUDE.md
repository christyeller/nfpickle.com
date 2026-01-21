# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

North Fork Pickleball Club website - a Next.js 16 full-stack application with public pages and admin dashboard. Built with React 19, TypeScript, PostgreSQL (Neon), and Prisma ORM.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (includes prisma generate)
npm run lint         # Run ESLint
npm run create-admin # Create admin user in database
npx prisma studio    # Open Prisma database GUI
npx prisma db push   # Push schema changes to database
```

## Architecture

### Route Structure (App Router)
- `src/app/(public)/` - Public pages (about, events, news, donate, contact, etc.)
- `src/app/admin/` - Protected admin dashboard (requires NextAuth session)
- `src/app/api/` - REST API endpoints

### Key Directories
- `src/components/public/` - Public-facing components with Framer Motion animations
- `src/components/admin/` - Admin dashboard components (DataTable, RichTextEditor, etc.)
- `src/lib/` - Core utilities:
  - `auth.ts` - NextAuth configuration (credentials provider, JWT)
  - `prisma.ts` - Prisma client singleton
  - `r2.ts` - Cloudflare R2 image upload/delete
  - `stripe.ts` - Payment processing
  - `validations.ts` - Zod schemas for all forms
  - `animations.ts` - Framer Motion animation variants

### Database Models (Prisma)
Event, Post, Page, Member, Donation, ContactSubmission, Gallery, Media, SiteSettings, User

## Image Storage

**Use Cloudflare R2** - not the `/public/` folder. Images in `/public/` get bundled into Vercel deploys.

**Workflow:**
1. Drop images in `media/` folder (gitignored, won't be committed)
2. On `git commit`, the pre-commit hook auto-uploads new images to R2
3. Images are available at `https://media.nfpickle.com/site-assets/{filename}`

**Manual upload:** `node scripts/upload-media.js`

R2 folder convention:
- `site-assets/` - Static site images (galleries, backgrounds)
- `media/` - User-uploaded content via admin

## Authentication

NextAuth v4 with credentials provider. All `/admin/*` routes require authentication. Sessions are JWT-based (no database sessions).

## API Patterns

Standard REST endpoints with Zod validation:
```typescript
// Validate with schema from lib/validations.ts
const result = eventSchema.safeParse(body);
if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });

// Check auth for protected routes
const session = await getServerSession(authOptions);
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

## Styling

Tailwind CSS with custom design tokens in `tailwind.config.mjs`:
- Colors: `court` (teal), `lime` (gold accent), `coral` (sage), `cream`, `charcoal`
- Shadows: `shadow-elevation-1` through `shadow-elevation-4`, `shadow-glow-lime`
- Typography: DM Sans font family

## Git Branching Workflow

**IMPORTANT: Always work on the ETHAN branch, not main.**

- The `ETHAN` branch is the development branch for making changes
- The `main` branch is for production deployments only
- After merging to main, ALWAYS switch back to ETHAN

**Commit and deploy workflow:**
```bash
# 1. Commit and push to ETHAN
git add -A && git commit -m "description" && git push origin ETHAN

# 2. Merge to main and push (then return to ETHAN)
git checkout main && git pull origin main && git merge ETHAN && git push origin main && git checkout ETHAN
```

**Never make direct edits on main.** If you find yourself on main, switch to ETHAN first: `git checkout ETHAN`

## After Making Changes

**Always commit, push, and verify deployment:**
1. `git add . && git commit -m "description" && git push`
2. Wait ~1 minute, then check deployment: `vercel ls | head -10`
3. If status is "Error", check logs: `vercel inspect <deployment-url> --logs | tail -50`
4. Fix any errors and repeat

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
