"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaAvatarCommentDemo() {
  const id = useId()

  return (
    <Field className="flex flex-row items-start gap-4">
      <Avatar className="size-12 shrink-0 basis-12">
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>

      <Textarea
        aria-label="Comment"
        id={id}
        placeholder="Write a comment..."
        className="min-h-30 flex-1"
      />
    </Field>
  )
}
