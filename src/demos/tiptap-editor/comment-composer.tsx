"use client"

import { useState } from "react"

import { TiptapEditor } from "@/registry/components/tiptap-editor"

export default function TiptapCommentComposerDemo() {
  const [content, setContent] = useState("<p></p>")
  const hasContent = content.replace(/<[^>]*>/g, "").trim().length > 0

  return (
    <section className="w-full max-w-2xl space-y-3 rounded-xl border p-4">
      <div>
        <h3 className="font-medium">Add a comment</h3>
        <p className="text-sm text-muted-foreground">
          A compact editor for comments, replies, and activity updates.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <TiptapEditor
          onValueChange={setContent}
          toolbar={["bold", "italic", "emoji", "link", "bullet_list"]}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Basic formatting and links are supported.
        </p>
        <button
          type="button"
          disabled={!hasContent}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity disabled:pointer-events-none disabled:opacity-50"
        >
          Comment
        </button>
      </div>
    </section>
  )
}
