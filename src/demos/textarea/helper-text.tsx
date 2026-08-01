"use client"

import { useId } from "react"

import { Field, FieldDescription } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaHelperTextDemo() {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <Field>
      <Label htmlFor={id}>Textarea with helper text</Label>
      <Textarea
        id={id}
        aria-describedby={descriptionId}
        placeholder="Leave a comment"
        className="min-h-30"
      />

      <FieldDescription
        id={descriptionId}
        aria-live="polite"
        className="mt-2 text-xs font-medium text-muted-foreground"
        role="region"
      >
        Please add as many details as you can
      </FieldDescription>
    </Field>
  )
}
