"use client"

import { useState } from "react"

import { TiptapEditor } from "@/registry/components/tiptap-editor"

const initialContent = `
  <h2>Live HTML output</h2>
  <p>Edit this document to inspect the generated markup.</p>
`

export default function TiptapLiveHtmlOutputDemo() {
  const [html, setHtml] = useState(initialContent.trim())

  return (
    <section className="grid w-full gap-4 lg:grid-cols-2">
      <div className="min-w-0 space-y-2">
        <h3 className="font-medium">Editor</h3>
        <div className="overflow-hidden rounded-xl border">
          <TiptapEditor
            initialContent={initialContent}
            onValueChange={setHtml}
            toolbar={[
              "undo",
              "redo",
              "heading",
              "bold",
              "italic",
              "underline",
              "bullet_list",
              "ordered_list",
              "blockquote",
              "code_block",
              "link",
            ]}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <h3 className="font-medium">Generated HTML</h3>
        <pre
          aria-live="polite"
          className="max-h-96 min-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl border bg-muted/40 p-4 text-xs"
        >
          {html}
        </pre>
      </div>
    </section>
  )
}
