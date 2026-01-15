import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageGalleryView from '../ImageGalleryView'

export interface ImageGalleryOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageGallery: {
      setImageGallery: (options: {
        images: string[]
        layout: 'grid' | 'carousel' | 'slider'
        columns?: number
      }) => ReturnType
    }
  }
}

export const ImageGallery = Node.create<ImageGalleryOptions>({
  name: 'imageGallery',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: (element) => {
          const imagesAttr = element.getAttribute('data-images')
          return imagesAttr ? JSON.parse(imagesAttr) : []
        },
        renderHTML: (attributes) => {
          return {
            'data-images': JSON.stringify(attributes.images),
          }
        },
      },
      layout: {
        default: 'grid',
        parseHTML: (element) => element.getAttribute('data-layout') || 'grid',
        renderHTML: (attributes) => {
          return {
            'data-layout': attributes.layout,
          }
        },
      },
      columns: {
        default: 3,
        parseHTML: (element) => parseInt(element.getAttribute('data-columns') || '3'),
        renderHTML: (attributes) => {
          return {
            'data-columns': attributes.columns,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-gallery"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'image-gallery' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageGalleryView)
  },

  addCommands() {
    return {
      setImageGallery:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})

export default ImageGallery
