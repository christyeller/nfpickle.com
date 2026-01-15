'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Upload, Loader2, Search, Check, Grid3X3, Images, LayoutList } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  secureUrl: string
  format: string
  bytes: number
  altText?: string
  createdAt: string
}

interface GalleryBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  onInsertGallery: (images: string[], layout: 'grid' | 'carousel' | 'slider', columns: number) => void
}

export default function GalleryBuilderModal({
  isOpen,
  onClose,
  onInsertGallery,
}: GalleryBuilderModalProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [layout, setLayout] = useState<'grid' | 'carousel' | 'slider'>('grid')
  const [columns, setColumns] = useState(3)

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
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
      setSelectedImages([])
    }
  }, [search, isOpen])

  const toggleImageSelection = (url: string) => {
    setSelectedImages((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    )
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 10 * 1024 * 1024) continue

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          const imageUrl = data.media?.secureUrl || data.media?.url
          if (imageUrl) {
            newUrls.push(imageUrl)
          }
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    }

    if (newUrls.length > 0) {
      setSelectedImages((prev) => [...prev, ...newUrls])
      fetchMedia()
    }

    setUploading(false)
    e.target.value = ''
  }

  const handleInsert = () => {
    if (selectedImages.length > 0) {
      onInsertGallery(selectedImages, layout, columns)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Create Image Gallery</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Layout Options */}
        <div className="flex items-center gap-6 p-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Layout:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setLayout('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  layout === 'grid' ? 'bg-lime text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                <Grid3X3 size={16} />
                Grid
              </button>
              <button
                onClick={() => setLayout('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  layout === 'carousel' ? 'bg-lime text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                <Images size={16} />
                Carousel
              </button>
              <button
                onClick={() => setLayout('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  layout === 'slider' ? 'bg-lime text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                <LayoutList size={16} />
                Slider
              </button>
            </div>
          </div>
          {layout === 'grid' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Columns:</span>
              <select
                value={columns}
                onChange={(e) => setColumns(parseInt(e.target.value))}
                className="px-3 py-1.5 border rounded-lg text-sm"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          )}
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
          <label className="flex items-center gap-2 px-4 py-2 bg-lime text-white rounded-lg hover:bg-lime/90 transition-colors cursor-pointer">
            {uploading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Upload size={18} />
            )}
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Selected Count */}
        {selectedImages.length > 0 && (
          <div className="px-4 py-2 bg-lime/10 border-b">
            <span className="text-sm text-lime font-medium">
              {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="animate-spin text-lime" size={32} />
            </div>
          ) : media.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <p>No images found</p>
              <p className="text-sm mt-1">Upload images to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {media.map((item) => {
                const imageUrl = item.secureUrl || item.url
                const isSelected = selectedImages.includes(imageUrl)
                const selectionIndex = selectedImages.indexOf(imageUrl)

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleImageSelection(imageUrl)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-lime ring-2 ring-lime/30'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={item.altText || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-lime text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {selectionIndex + 1}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-3 border-t">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={selectedImages.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-lime text-white rounded-lg hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={18} />
            Insert Gallery ({selectedImages.length})
          </button>
        </div>
      </div>
    </div>
  )
}
