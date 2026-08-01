"use client"

import { TiptapEditor } from "@/registry/components/tiptap-editor"

const initialContent = `
  <h2>Full editor workspace</h2>
  <p>
    This variant exposes every toolbar action supported by the current
    component.
  </p>
`

export default function TiptapFullToolbarDemo() {
  return (
    <section className="w-full space-y-3">
      <div>
        <h3 className="font-medium">Complete toolbar</h3>
        <p className="text-sm text-muted-foreground">
          Suitable for advanced publishing and document-management workflows.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <TiptapEditor
          initialContent={initialContent}
          toolbar={[
            "undo",
            "redo",
            "search_and_replace",
            "clear",
            "font_family",
            "heading",
            "font_size",
            "bold",
            "italic",
            "underline",
            "strike",
            "more_mark",
            "emoji",
            "text_color",
            "highlight",
            "bullet_list",
            "ordered_list",
            "align",
            "link",
            "image",
            "video",
            "blockquote",
            "horizontal_rule",
            "code",
            "code_block",
            "column",
            "table",
            "export_pdf",
            "import_word",
            "export_word",
            "code_viewer",
          ]}
        />
      </div>
    </section>
  )
}
