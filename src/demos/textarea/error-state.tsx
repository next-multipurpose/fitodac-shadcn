"use client"

import { useId } from "react"

import { Field, FieldDescription } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaErrorStateDemo() {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <Field>
      <Label htmlFor={id}>Textarea with error</Label>

      <Textarea
        aria-invalid
        aria-describedby={errorId}
        defaultValue="Hello!"
        id={id}
        placeholder="Leave a comment"
        className="min-h-30"
      />

      <FieldDescription
        id={errorId}
        aria-live="polite"
        className="mt-2 text-xs font-medium text-destructive"
        role="alert"
      >
        Message should be at least 10 characters
      </FieldDescription>
    </Field>
  )
}
