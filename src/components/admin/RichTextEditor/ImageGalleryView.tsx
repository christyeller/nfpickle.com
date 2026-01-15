'use client'

import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Grid3X3, LayoutList, Images, Trash2, Settings } from 'lucide-react'

export default function ImageGalleryView({ node, updateAttributes, deleteNode, selected }: NodeViewProps) {
  const { images, layout, columns } = node.attrs as {
    images: string[]
    layout: 'grid' | 'carousel' | 'slider'
    columns: number
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const renderGrid = () => (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {images.map((src, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-lg">
          <img
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )

  const renderCarousel = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            contentEditable={false}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            contentEditable={false}
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                contentEditable={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )

  const renderSlider = () => (
    <div className="relative">
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {images.map((src, index) => (
            <div key={index} className="w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
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
  )

  return (
    <NodeViewWrapper className={`my-4 ${selected ? 'ring-2 ring-lime rounded-xl' : ''}`}>
      <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Images size={16} />
            <span>Image Gallery ({images.length} images)</span>
            <span className="px-2 py-0.5 bg-gray-200 rounded text-xs capitalize">{layout}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              contentEditable={false}
              title="Settings"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={deleteNode}
              className="p-1.5 hover:bg-red-100 text-red-600 rounded transition-colors"
              contentEditable={false}
              title="Delete gallery"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200" contentEditable={false}>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Layout</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => updateAttributes({ layout: 'grid' })}
                    className={`p-2 rounded ${layout === 'grid' ? 'bg-lime text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    title="Grid"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => updateAttributes({ layout: 'carousel' })}
                    className={`p-2 rounded ${layout === 'carousel' ? 'bg-lime text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    title="Carousel"
                  >
                    <Images size={16} />
                  </button>
                  <button
                    onClick={() => updateAttributes({ layout: 'slider' })}
                    className={`p-2 rounded ${layout === 'slider' ? 'bg-lime text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    title="Slider"
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
              {layout === 'grid' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Columns</label>
                  <select
                    value={columns}
                    onChange={(e) => updateAttributes({ columns: parseInt(e.target.value) })}
                    className="px-3 py-1.5 border rounded text-sm"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Content */}
        <div contentEditable={false}>
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No images in gallery
            </div>
          ) : layout === 'grid' ? (
            renderGrid()
          ) : layout === 'carousel' ? (
            renderCarousel()
          ) : (
            renderSlider()
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}
