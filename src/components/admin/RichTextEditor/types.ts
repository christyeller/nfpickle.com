export interface RichTextEditorFeatures {
  basic?: boolean      // Bold, italic, underline, strike, headings
  lists?: boolean      // Bullet lists, ordered lists, blockquotes
  links?: boolean      // Link insertion and editing
  images?: boolean     // Image upload via R2
  advanced?: boolean   // Tables, code blocks, text alignment
}

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  features?: RichTextEditorFeatures
  minHeight?: string
}

export interface ToolbarProps {
  editor: any // TipTap Editor type
  features: RichTextEditorFeatures
}
