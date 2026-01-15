'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Upload, Loader2, Search } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  secureUrl: string
  format: string
  bytes: number
  altText?: string
  createdAt: string
}

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (url: string) => void
  onUploadClick: () => void
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  onSelectImage,
  onUploadClick,
}: ImageGalleryModalProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
      })
      const response = await fetch(`/api/media?${params}`)
      if (response.ok) {
        const data = await response.json()
        setMedia(data.media)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen, fetchMedia])

  useEffect(() => {
    if (isOpen) {
      setPage(1)
    }
  }, [search, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Image Gallery</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Upload */}
        <div className="flex gap-3 p-4 border-b">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime focus:border-lime outline-none"
            />
          </div>
          <button
            onClick={() => {
              onClose()
              onUploadClick()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-lime text-white rounded-lg hover:bg-lime/90 transition-colors"
          >
            <Upload size={18} />
            Upload New
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="animate-spin text-lime" size={32} />
            </div>
          ) : media.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <p>No images found</p>
              <button
                onClick={() => {
                  onClose()
                  onUploadClick()
                }}
                className="mt-2 text-lime hover:underline"
              >
                Upload your first image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {media.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectImage(item.secureUrl || item.url)
                    onClose()
                  }}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-lime transition-colors focus:outline-none focus:border-lime"
                >
                  <img
                    src={item.secureUrl || item.url}
                    alt={item.altText || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
