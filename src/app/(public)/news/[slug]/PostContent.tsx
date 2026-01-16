'use client'

import React, { useState, useEffect, useRef } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

interface PostContentProps {
  content: string
}

interface GalleryData {
  images: string[]
  layout: 'grid' | 'carousel' | 'slider'
  columns: number
}

function ImageGallery({ images, layout, columns }: GalleryData) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const lightboxSlides = images.map((src) => ({ src }))

  if (layout === 'grid') {
    return (
      <>
        <div
          className="grid gap-3 my-6"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Thumbnails]}
        />
      </>
    )
  }

  if (layout === 'carousel') {
    return (
      <>
        <div className="relative my-6">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Thumbnails]}
        />
      </>
    )
  }

  // Slider layout
  return (
    <>
      <div className="relative my-6">
        <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {images.map((src, index) => (
              <div
                key={index}
                className="w-56 h-56 flex-shrink-0 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Thumbnails]}
      />
    </>
  )
}

export default function PostContent({ content }: PostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [galleries, setGalleries] = useState<{ id: string; data: GalleryData }[]>([])
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    // Sanitize the HTML content, allowing div and data attributes for galleries
    const clean = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3',
                     'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'table',
                     'thead', 'tbody', 'tr', 'th', 'td', 'pre', 'code', 'div', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'align', 'style',
                     'data-type', 'data-images', 'data-layout', 'data-columns']
    })

    // Parse the sanitized HTML to find galleries
    const parser = new DOMParser()
    const doc = parser.parseFromString(clean, 'text/html')
    const galleryElements = doc.querySelectorAll('div[data-type="image-gallery"]')

    const foundGalleries: { id: string; data: GalleryData }[] = []

    galleryElements.forEach((el, index) => {
      const id = `gallery-${index}`
      const imagesAttr = el.getAttribute('data-images')
      const images = imagesAttr ? JSON.parse(imagesAttr) : []
      const layout = (el.getAttribute('data-layout') || 'grid') as GalleryData['layout']
      const columns = parseInt(el.getAttribute('data-columns') || '3')

      foundGalleries.push({
        id,
        data: { images, layout, columns }
      })

      // Replace the gallery element with a placeholder
      el.setAttribute('data-gallery-id', id)
      el.innerHTML = ''
    })

    setGalleries(foundGalleries)
    setSanitizedContent(doc.body.innerHTML)
  }, [content])

  // After sanitized content is set, render galleries into placeholders
  useEffect(() => {
    // This effect is just for triggering re-render when galleries change
  }, [galleries])

  if (!sanitizedContent) {
    return null
  }

  // Split the content at gallery placeholders and render galleries inline
  const parts: React.ReactNode[] = []
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = sanitizedContent

  const processNodes = (nodes: NodeListOf<ChildNode> | ChildNode[]) => {
    nodes.forEach((node, nodeIndex) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element
        if (el.getAttribute('data-type') === 'image-gallery') {
          const galleryId = el.getAttribute('data-gallery-id')
          const gallery = galleries.find(g => g.id === galleryId)
          if (gallery) {
            parts.push(
              <ImageGallery
                key={galleryId}
                images={gallery.data.images}
                layout={gallery.data.layout}
                columns={gallery.data.columns}
              />
            )
          }
        } else {
          // For other elements, render as HTML
          const html = el.outerHTML
          parts.push(
            <div
              key={`html-${nodeIndex}-${parts.length}`}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        parts.push(
          <span key={`text-${nodeIndex}-${parts.length}`}>{node.textContent}</span>
        )
      }
    })
  }

  processNodes(tempDiv.childNodes)

  return <div ref={containerRef}>{parts}</div>
}
