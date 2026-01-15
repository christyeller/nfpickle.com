'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Upload, Loader2, Search, Image as ImageIcon } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  secureUrl: string | null
  format: string
  bytes: number
  altText?: string
  createdAt: string
}

interface FeaturedImagePickerProps {
  value: string | null | undefined
  onChange: (mediaId: string | null) => void
  label?: string
}

export default function FeaturedImagePicker({
  value,
  onChange,
  label = 'Featured Image',
}: FeaturedImagePickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null)
  const [uploading, setUploading] = useState(false)

  // Fetch the current selected image details
  useEffect(() => {
    if (value) {
      fetch(`/api/media/${value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.media) {
            setSelectedImage(data.media)
          }
        })
        .catch(console.error)
    } else {
      setSelectedImage(null)
    }
  }, [value])

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
    if (isModalOpen) {
      fetchMedia()
    }
  }, [isModalOpen, fetchMedia])

  useEffect(() => {
    if (isModalOpen) {
      setPage(1)
    }
  }, [search, isModalOpen])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onChange(data.media.id)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSelectImage = (item: MediaItem) => {
    onChange(item.id)
    setIsModalOpen(false)
  }

  const handleRemoveImage = () => {
    onChange(null)
  }

  return (
    <div>
      <label className="label">{label}</label>

      {selectedImage ? (
        <div className="relative inline-block">
          <img
            src={selectedImage.secureUrl || selectedImage.url}
            alt={selectedImage.altText || 'Featured image'}
            className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 text-sm rounded hover:bg-white transition-colors"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-lime hover:bg-lime/5 transition-colors"
        >
          <ImageIcon className="text-gray-400 mb-2" size={24} />
          <span className="text-sm text-gray-500">Select Image</span>
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col m-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Select Featured Image</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

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
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="animate-spin text-lime" size={32} />
                </div>
              ) : media.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <p>No images found</p>
                  <p className="mt-2 text-sm">Upload an image to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {media.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectImage(item)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors focus:outline-none ${
                        value === item.id
                          ? 'border-lime ring-2 ring-lime/50'
                          : 'border-transparent hover:border-lime'
                      }`}
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 p-4 border-t">
                <button
                  type="button"
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
                  type="button"
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
      )}
    </div>
  )
}
