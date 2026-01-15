'use client'

import { Editor } from '@tiptap/react'
import { useRef, useState } from 'react'
import ImageGalleryModal from './ImageGalleryModal'

interface ImageUploadButtonProps {
  editor: Editor
  children: React.ReactNode
}

export default function ImageUploadButton({ editor, children }: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()

      // Insert image into editor
      const imageUrl = data.media?.secureUrl || data.media?.url
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run()
      }
    } catch (error) {
      console.error('Image upload error:', error)
      const message = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to upload image: ${message}`)
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSelectImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => setShowGallery(true)}
        disabled={isUploading}
        title="Insert Image"
        className={`
          p-2 rounded-lg transition-colors duration-200
          hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
          ${editor.isActive('image') ? 'bg-lime/20 text-lime hover:bg-lime/30' : 'text-gray-700'}
        `}
      >
        {isUploading ? (
          <div className="animate-spin h-[18px] w-[18px] border-2 border-gray-300 border-t-lime rounded-full" />
        ) : (
          children
        )}
      </button>

      <ImageGalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onSelectImage={handleSelectImage}
        onUploadClick={() => fileInputRef.current?.click()}
      />
    </>
  )
}
