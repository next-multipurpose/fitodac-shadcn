"use client"

import { TiptapEditor } from "@/registry/components/tiptap-editor"

const initialContent = `
  <h2>Project notes</h2>
  <p>
    Use a compact toolbar when users only need the most common formatting
    controls.
  </p>
`

export default function TiptapMinimalToolbarDemo() {
  return (
    <section className="w-full space-y-3">
      <div>
        <h3 className="font-medium">Minimal toolbar</h3>
        <p className="text-sm text-muted-foreground">
          A focused editor for notes and short internal documents.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <TiptapEditor
          initialContent={initialContent}
          toolbar={[
            "undo",
            "redo",
            "heading",
            "bold",
            "italic",
            "bullet_list",
            "ordered_list",
            "link",
          ]}
        />
      </div>
    </section>
  )
}
