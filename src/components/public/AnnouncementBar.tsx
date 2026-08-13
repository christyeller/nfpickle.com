'use client'

export default function AnnouncementBar() {
  return (
    <div className="bg-[#F38D09] text-white py-2.5 px-4 text-center relative z-[60]">
      <div className="container-custom flex items-center justify-center gap-3 flex-wrap">
        <span className="font-semibold text-sm md:text-base">
          We have our very own North Fork Pickleball Song!
        </span>
        <a
          href="https://suno.com/s/jDMEjNM8ZzEnqeLP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-1.5 bg-white text-gray-700 font-bold text-sm rounded-lg hover:bg-white/90 transition-colors"
        >
          LISTEN HERE
        </a>
      </div>
    </div>
  )
}
