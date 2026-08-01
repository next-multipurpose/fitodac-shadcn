"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaAutoGrowDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>Autogrowing textarea</Label>
      <Textarea
        className="field-sizing-content max-h-29.5 min-h-30 resize-none py-1.75"
        id={id}
        placeholder="Leave a comment"
      />
    </Field>
  )
}
