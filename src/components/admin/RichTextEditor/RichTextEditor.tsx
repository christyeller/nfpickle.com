'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import { createLowlight } from 'lowlight'
import { useEffect } from 'react'
import Toolbar from './Toolbar'
import ImageGallery from './extensions/ImageGallery'

// Create lowlight instance
const lowlight = createLowlight()

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  features?: {
    basic?: boolean
    lists?: boolean
    links?: boolean
    images?: boolean
    advanced?: boolean
  }
  minHeight?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  features = { basic: true, lists: true, links: true, images: true, advanced: true },
  minHeight = '300px',
}: RichTextEditorProps) {
  const extensions = [
    StarterKit.configure({
      heading: features.basic ? { levels: [1, 2, 3] } : false,
      bulletList: features.lists,
      orderedList: features.lists,
      blockquote: features.lists,
      codeBlock: false, // We'll use CodeBlockLowlight instead
    }),
  ]

  if (features.basic) {
    extensions.push(Underline)
  }

  if (features.advanced) {
    extensions.push(
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    )
    extensions.push(
      Table.configure({
        resizable: true,
      })
    )
    extensions.push(TableRow)
    extensions.push(TableHeader)
    extensions.push(TableCell)
    extensions.push(
      CodeBlockLowlight.configure({
        lowlight,
      })
    )
  }

  if (features.links) {
    extensions.push(
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      })
    )
  }

  if (features.images) {
    extensions.push(
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      })
    )
    extensions.push(ImageGallery)
  }

  extensions.push(
    Placeholder.configure({
      placeholder,
    })
  )

  const editor = useEditor({
    extensions,
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[' +
          minHeight +
          '] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
  })

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-cream focus-within:ring-2 focus-within:ring-lime focus-within:border-lime transition-all duration-200">
      <Toolbar editor={editor} features={features} />
      <EditorContent
        editor={editor}
        className="tiptap-editor"
        style={{ minHeight }}
      />
    </div>
  )
}
