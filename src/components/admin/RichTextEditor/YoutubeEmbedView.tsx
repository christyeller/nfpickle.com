'use client'

import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Trash2, Youtube } from 'lucide-react'

export default function YoutubeEmbedView({ node, deleteNode, selected }: NodeViewProps) {
  const { videoId } = node.attrs as { videoId: string }

  return (
    <NodeViewWrapper className={`my-4 ${selected ? 'ring-2 ring-lime rounded-xl' : ''}`}>
      <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Youtube size={16} />
            <span>YouTube Video</span>
          </div>
          <button
            type="button"
            onClick={deleteNode}
            className="p-1.5 hover:bg-red-100 text-red-600 rounded transition-colors"
            contentEditable={false}
            title="Remove video"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div contentEditable={false}>
          {videoId ? (
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title="YouTube video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">Invalid YouTube video</div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}
