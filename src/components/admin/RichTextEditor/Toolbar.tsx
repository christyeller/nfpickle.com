'use client'

import { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Images,
  Table,
  CodeSquare,
  Undo,
  Redo,
} from 'lucide-react'
import { useState } from 'react'
import ImageUploadButton from './ImageUploadButton'
import GalleryBuilderModal from './GalleryBuilderModal'

interface ToolbarProps {
  editor: Editor
  features: {
    basic?: boolean
    lists?: boolean
    links?: boolean
    images?: boolean
    advanced?: boolean
  }
}

export default function Toolbar({ editor, features }: ToolbarProps) {
  const [showGalleryModal, setShowGalleryModal] = useState(false)

  const handleInsertGallery = (images: string[], layout: 'grid' | 'carousel' | 'slider', columns: number) => {
    if (editor.commands.setImageGallery) {
      editor.commands.setImageGallery({ images, layout, columns })
    }
  }

  const ToolbarButton = ({
    onClick,
    active = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-lg transition-colors duration-200
        hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
        ${active ? 'bg-lime/20 text-lime hover:bg-lime/30' : 'text-gray-700'}
      `}
    >
      {children}
    </button>
  )

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
      {/* Text Formatting */}
      {features.basic && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >
            <Code size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Headings */}
      {features.basic && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Alignment */}
      {features.advanced && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Lists */}
      {features.lists && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Links and Images */}
      {(features.links || features.images) && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          {features.links && (
            <ToolbarButton
              onClick={addLink}
              active={editor.isActive('link')}
              title="Insert Link"
            >
              <Link2 size={18} />
            </ToolbarButton>
          )}
          {features.images && (
            <>
              <ImageUploadButton editor={editor}>
                <ImageIcon size={18} />
              </ImageUploadButton>
              <ToolbarButton
                onClick={() => setShowGalleryModal(true)}
                active={editor.isActive('imageGallery')}
                title="Insert Image Gallery"
              >
                <Images size={18} />
              </ToolbarButton>
            </>
          )}
        </div>
      )}

      {/* Advanced */}
      {features.advanced && (
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={addTable}
            active={editor.isActive('table')}
            title="Insert Table"
          >
            <Table size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <CodeSquare size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-1 ml-auto">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>

      <GalleryBuilderModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        onInsertGallery={handleInsertGallery}
      />
    </div>
  )
}
