import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const samplePages = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `# Privacy Policy

**Last Updated: January 2026**

North Fork Pickleball Club ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.

## Information We Collect

We collect information you provide directly to us when you:
- Register for membership
- Sign up for events or tournaments
- Contact us through our website
- Subscribe to our newsletter

This may include:
- Name and contact information
- Email address and phone number
- Skill level and playing preferences
- Payment information (processed securely through third-party providers)

## How We Use Your Information

We use the information we collect to:
- Process membership registrations and renewals
- Communicate about events, tournaments, and club activities
- Send newsletters and updates (with your consent)
- Improve our services and website functionality
- Process donations and payments

## Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share information with:
- Payment processors (Stripe) for donation and membership processing
- Email service providers for newsletters (only if you opt in)
- Legal authorities if required by law

## Data Security

We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.

## Your Rights

You have the right to:
- Access your personal information
- Request correction of inaccurate data
- Request deletion of your information
- Opt out of marketing communications
- Withdraw consent at any time

## Cookies

Our website may use cookies to enhance user experience. You can control cookie settings through your browser.

## Contact Us

If you have questions about this Privacy Policy, please contact us at:
- Email: info@northforkpickleball.com
- Address: North Fork Pickleball Club, Paonia, CO 81428

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.`,
    metaTitle: 'Privacy Policy - North Fork Pickleball Club',
    metaDescription: 'Learn how North Fork Pickleball Club collects, uses, and protects your personal information.',
    status: 'published',
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `# Terms of Service

**Effective Date: January 2026**

Welcome to North Fork Pickleball Club. By accessing our website and participating in our activities, you agree to these Terms of Service.

## Membership Terms

### Registration
- Membership is open to all individuals who complete the registration process
- Members must provide accurate and current information
- Members are responsible for maintaining the security of their account

### Membership Types
- **Community (Free)**: Newsletter and event notifications
- **Annual ($25/year)**: Full member benefits including voting rights
- **Lifetime ($200)**: One-time payment for lifetime access

### Membership Obligations
- Members agree to follow club rules and guidelines
- Members must conduct themselves respectfully at all times
- Members are responsible for their own safety during activities

## Use of Facilities

### Court Usage
- Courts are available for open play during scheduled times
- Members must respect court rotation and sharing protocols
- Proper footwear and equipment required
- Follow all posted safety guidelines

### Liability
- Members participate in activities at their own risk
- The club is not liable for injuries or property damage
- Members are encouraged to carry their own insurance

## Events and Tournaments

### Registration
- Event registration may be required and is first-come, first-served
- Cancellation policies vary by event
- Members may receive priority registration for certain events

### Code of Conduct
- Players must follow USAPA rules and guidelines
- Unsportsmanlike conduct will not be tolerated
- The club reserves the right to remove participants for violations

## Donations

- All donations are final and non-refundable
- Donation receipts will be provided for tax purposes
- The club uses donations solely for pickleball-related activities

## Intellectual Property

- All website content is property of North Fork Pickleball Club
- Members may not reproduce content without permission
- The club logo and branding are protected trademarks

## Privacy

Your use of our website is also governed by our Privacy Policy.

## Modifications

We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.

## Termination

We reserve the right to terminate or suspend memberships for violations of these terms.

## Governing Law

These terms are governed by the laws of Colorado, USA.

## Contact

Questions about these terms? Contact us at info@northforkpickleball.com.`,
    metaTitle: 'Terms of Service - North Fork Pickleball Club',
    metaDescription: 'Terms and conditions for North Fork Pickleball Club membership and participation.',
    status: 'published',
  },
  {
    title: 'Frequently Asked Questions',
    slug: 'faq',
    content: `# Frequently Asked Questions

Get answers to common questions about North Fork Pickleball Club.

## General Questions

### What is pickleball?
Pickleball is a paddle sport that combines elements of tennis, badminton, and table tennis. It's played on a smaller court with a lower net, using a perforated plastic ball and solid paddles. The game is easy to learn but challenging to master!

### Do I need to be a member to play?
No! Our open play sessions are free and open to everyone. However, membership provides additional benefits like voting rights, event discounts, and priority registration.

### What should I bring to play?
For your first visit, just bring yourself and athletic shoes! We have loaner paddles and balls available. Once you're hooked, you'll want to invest in your own paddle.

## Membership Questions

### How do I become a member?
Visit our [Membership page](/membership) to choose a membership tier and complete the registration form. It only takes a few minutes!

### What's the difference between membership levels?
- **Community (Free)**: Stay connected with newsletters and event notifications
- **Annual ($25)**: Full voting rights, discounts, priority registration
- **Lifetime ($200)**: All annual benefits with a one-time payment

### Can I upgrade my membership later?
Yes! Contact us at info@northforkpickleball.com and we'll help you upgrade. The cost difference will be applied.

## Playing Questions

### When can I play?
Check our [Play page](/play) for current open play schedules. Typically:
- Monday, Wednesday, Friday: 9 AM - 12 PM
- Saturday: 10 AM - 1 PM

### What if I've never played before?
Perfect! We welcome beginners. Come to any open play session and experienced players will help you learn. We also offer beginner clinics throughout the year.

### What skill level do I need?
All levels are welcome! We have players ranging from complete beginners (2.0) to advanced tournament players (4.5+). We'll help you find games at your level.

### Are the courts lighted?
Yes! Our main courts at Paonia Town Park have lights for evening play.

## Events & Tournaments

### Do you host tournaments?
Yes! We host several tournaments throughout the year. Check our [Events page](/events) for upcoming tournaments.

### Are tournaments competitive?
We host both recreational and competitive tournaments. Each event listing specifies the skill levels and format.

### Can I volunteer at events?
Absolutely! We always need volunteers. Event volunteers often receive free tournament entry or other perks.

## Court & Facility Questions

### Where are the courts located?
Our primary courts are at:
- **Paonia Town Park**: 214 Grand Ave, Paonia, CO 81428 (4 courts)
- **Hotchkiss Town Park**: Hotchkiss, CO (2 courts)

### Are there restrooms available?
Yes, restrooms are available at both park locations.

### Is there parking?
Yes, both locations have free parking.

### Can I reserve a court?
Courts are first-come, first-served during open play. For private events or clinics, contact us about court reservations.

## Equipment Questions

### What paddle should I buy?
For beginners, we recommend starting with a mid-priced paddle ($40-80). Visit our pro shop or ask experienced players for recommendations based on your playing style.

### Do you sell equipment?
We occasionally have equipment for sale at events. We're also happy to provide recommendations for local and online retailers.

### Can I borrow a paddle?
Yes! We have loaner paddles available at the courts during open play sessions.

## Contact & Support

### How do I contact the club?
- **Email**: info@northforkpickleball.com
- **Website**: [Contact page](/contact)
- **Facebook**: Search for "North Fork Pickleball Club"

### How can I get involved?
We're always looking for volunteers! Email us or talk to board members at open play about opportunities to help.

### Where can I suggest improvements?
We love feedback! Email us or attend our annual member meeting to share suggestions.

---

**Have a question not answered here?** [Contact us](/contact) and we'll be happy to help!`,
    metaTitle: 'FAQ - North Fork Pickleball Club',
    metaDescription: 'Frequently asked questions about North Fork Pickleball Club, membership, courts, and playing pickleball.',
    status: 'published',
  },
  {
    title: 'What is Pickleball?',
    slug: 'what-is-pickleball',
    content: `# What is Pickleball?

Pickleball is America's fastest-growing sport, combining elements of tennis, badminton, and table tennis into an exciting and accessible game for all ages and skill levels.

## The Basics

### The Court
Pickleball is played on a badminton-sized court (20' x 44') with a modified tennis net lowered to 34" at the center. The court includes:
- Service areas on each side
- A 7-foot non-volley zone (the "kitchen") on both sides of the net
- Baseline and sideline boundaries

### The Equipment
- **Paddles**: Solid paddles slightly larger than ping-pong paddles, made from wood, composite, or graphite
- **Ball**: Perforated plastic ball (like a wiffle ball) designed for indoor or outdoor play
- **Net**: Similar to tennis net but 2" lower (36" at sidelines, 34" at center)

### Basic Rules
1. **Serving**: Underhand serve diagonally across the court
2. **Two-Bounce Rule**: Ball must bounce once on each side before volleys are allowed
3. **The Kitchen**: No volleying while standing in the 7-foot non-volley zone
4. **Scoring**: Games played to 11 points (win by 2), only serving team can score

## Why Pickleball?

### Easy to Learn
The rules are simple and straightforward. Most people can rally within their first 15 minutes of play!

### Social & Fun
The smaller court size promotes conversation and community. Games are quick, allowing for frequent player rotation.

### Great Exercise
Pickleball provides excellent cardiovascular exercise while being easier on joints than tennis or running.

### All Ages & Abilities
From kids to seniors, beginners to pros, everyone can enjoy pickleball. The sport naturally accommodates different skill levels.

### Strategic Depth
While easy to learn, pickleball offers complex strategy, shot variety, and competitive opportunities for those seeking a challenge.

## Playing Formats

### Singles
One player on each side of the net. More physically demanding but allows for individual competition.

### Doubles
Two players per side (most popular format). Emphasizes teamwork, strategy, and positioning.

### Mixed Doubles
One male and one female player per side. Popular in tournaments and social play.

## Skill Levels

Pickleball uses a rating system from 1.0 to 5.5+:
- **1.0-2.5**: Beginner - learning basic rules and strokes
- **3.0-3.5**: Intermediate - consistent strokes and court positioning
- **4.0-4.5**: Advanced - strategic play and shot variety
- **5.0+**: Professional - tournament-level skills

## History

Pickleball was invented in 1965 on Bainbridge Island, Washington, by Joel Pritchard, Bill Bell, and Barney McCallum. The sport has grown from backyard fun to a competitive international sport with millions of players worldwide.

The name "pickleball" has two origin stories:
1. Named after the Pritchard family's dog, Pickles
2. Named after the "pickle boat" in crew, where leftover rowers race

## Getting Started

Ready to play? Here's what to do:

1. **Find Courts**: Check our [Play page](/play) for local court locations
2. **Get Equipment**: Start with a borrowed paddle or basic model ($30-50)
3. **Learn the Rules**: Watch a quick tutorial video or ask players at the court
4. **Join Open Play**: Come to one of our sessions - beginners always welcome!
5. **Take a Clinic**: We offer beginner clinics to help you improve quickly

## Join the Community

North Fork Pickleball Club welcomes players of all levels. Whether you're curious about trying pickleball for the first time or you're an experienced player new to the area, we'd love to see you on the courts!

[Become a Member](/membership) | [View Schedule](/play) | [Contact Us](/contact)`,
    metaTitle: 'What is Pickleball? - North Fork Pickleball Club',
    metaDescription: 'Learn about pickleball - the rules, equipment, and why it\'s America\'s fastest-growing sport. Perfect for all ages and skill levels.',
    status: 'published',
  },
]

async function main() {
  console.log('🌱 Seeding pages...')

  for (const page of samplePages) {
    const result = await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    })
    console.log(`✓ Created/updated page: ${result.title} (${result.slug})`)
  }

  console.log('\n✅ Seeding complete!')
  console.log(`📄 Added ${samplePages.length} pages to the database`)
  console.log('\nYou can now view and edit these pages at:')
  console.log('http://localhost:3000/admin/pages')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding pages:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
