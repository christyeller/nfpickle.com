'use client'

import { Editor } from '@tiptap/react'
import { useRef, useState } from 'react'
import { FileText, Upload, X, ExternalLink } from 'lucide-react'

interface DocumentUploadButtonProps {
  editor: Editor
  children: React.ReactNode
}

interface UploadedDocument {
  id: string
  url: string
  originalName: string
  format: string
  bytes: number
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
]

const FILE_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
  'application/vnd.ms-excel': 'Excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'text/plain': 'Text',
  'text/csv': 'CSV',
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentUploadButton({ editor, children }: DocumentUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocument | null>(null)
  const [linkText, setLinkText] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Allowed: PDF, Word, Excel, TXT, CSV')
      return
    }

    // Validate file size (25MB max for documents)
    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be less than 25MB')
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
      const doc = data.media

      setUploadedDoc({
        id: doc.id,
        url: doc.secureUrl || doc.url,
        originalName: doc.originalName || file.name,
        format: doc.format,
        bytes: doc.bytes,
      })

      // Set default link text to file name without extension
      const defaultLinkText = file.name.replace(/\.[^/.]+$/, '')
      setLinkText(defaultLinkText)
    } catch (err) {
      console.error('Document upload error:', err)
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to upload document: ${message}`)
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleInsertLink = () => {
    if (!uploadedDoc || !linkText.trim()) return

    // Insert the link into the editor
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'text',
        marks: [
          {
            type: 'link',
            attrs: {
              href: uploadedDoc.url,
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        ],
        text: linkText.trim(),
      })
      .run()

    // Close modal and reset state
    handleClose()
  }

  const handleClose = () => {
    setShowModal(false)
    setUploadedDoc(null)
    setLinkText('')
    setError('')
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => setShowModal(true)}
        disabled={isUploading}
        title="Upload Document / PDF"
        className={`
          p-2 rounded-lg transition-colors duration-200
          hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
          text-gray-700
        `}
      >
        {isUploading ? (
          <div className="animate-spin h-[18px] w-[18px] border-2 border-gray-300 border-t-lime rounded-full" />
        ) : (
          children
        )}
      </button>

      {/* Document Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {!uploadedDoc ? (
                // Upload Area
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-lime hover:bg-lime/5 transition-colors"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin h-10 w-10 border-3 border-gray-300 border-t-lime rounded-full" />
                      <p className="text-gray-600">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-700 font-medium mb-1">Click to upload a document</p>
                      <p className="text-gray-500 text-sm">
                        PDF, Word, Excel, TXT, or CSV (max 25MB)
                      </p>
                    </>
                  )}
                </div>
              ) : (
                // Document uploaded - show link text input
                <div className="space-y-4">
                  {/* Uploaded file info */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-lime/20 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-lime" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{uploadedDoc.originalName}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(uploadedDoc.bytes)} • {uploadedDoc.format.toUpperCase()}
                      </p>
                    </div>
                    <a
                      href={uploadedDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <ExternalLink size={18} className="text-gray-500" />
                    </a>
                  </div>

                  {/* Link text input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="Enter the text to display for the link"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime focus:border-lime outline-none"
                      autoFocus
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This text will appear as a clickable link in your post
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              {uploadedDoc && (
                <button
                  onClick={handleInsertLink}
                  disabled={!linkText.trim()}
                  className="px-4 py-2 bg-lime text-court-dark font-semibold rounded-lg hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insert Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
