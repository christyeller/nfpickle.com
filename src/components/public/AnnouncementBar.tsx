'use client'

import Link from 'next/link'

export default function AnnouncementBar() {
  return (
    <div className="bg-[#F38D09] text-white py-2.5 px-4 text-center relative z-50">
      <div className="container-custom flex items-center justify-center gap-3 flex-wrap">
        <span className="font-semibold text-sm md:text-base">
          Kids Pickleball Clinic June 24!
        </span>
        <Link
          href="/events/kids-pickleball-clinic-age-9-12"
          className="inline-flex items-center px-4 py-1.5 bg-white text-gray-700 font-bold text-sm rounded-lg hover:bg-white/90 transition-colors"
        >
          REGISTER NOW
        </Link>
      </div>
    </div>
  )
}
