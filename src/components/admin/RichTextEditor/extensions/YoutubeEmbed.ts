import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import YoutubeEmbedView from '../YoutubeEmbedView'

export interface YoutubeEmbedOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtubeEmbed: {
      setYoutubeEmbed: (options: { videoId: string }) => ReturnType
    }
  }
}

export const YoutubeEmbed = Node.create<YoutubeEmbedOptions>({
  name: 'youtubeEmbed',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      videoId: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-video-id') || '',
        renderHTML: (attributes) => {
          return {
            'data-video-id': attributes.videoId,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="youtube-embed"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'youtube-embed' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeEmbedView)
  },

  addCommands() {
    return {
      setYoutubeEmbed:
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

export default YoutubeEmbed
