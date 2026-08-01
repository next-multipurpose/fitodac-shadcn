"use client"

import { TiptapEditor } from "@/registry/components/tiptap-editor"

const initialContent = `
  <h1>Building a consistent admin interface</h1>
  <p>
    A reusable component library reduces duplicated work and gives every
    dashboard a predictable visual language.
  </p>
  <blockquote>
    Components should remain simple by default and inherit their appearance
    from the active theme.
  </blockquote>
  <h2>Implementation principles</h2>
  <ul>
    <li>Use semantic theme tokens instead of fixed colors.</li>
    <li>Keep component APIs small and composable.</li>
    <li>Copy only the components required by each project.</li>
  </ul>
  <p>
    The editor can be used for articles, documentation, release notes, or
    long-form descriptions.
  </p>
`

export default function TiptapArticleEditorDemo() {
  return (
    <section className="w-full space-y-3">
      <div>
        <h3 className="font-medium">Article editor</h3>
        <p className="text-sm text-muted-foreground">
          Rich text initialized with headings, lists, and a quotation.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <TiptapEditor initialContent={initialContent} />
      </div>
    </section>
  )
}
