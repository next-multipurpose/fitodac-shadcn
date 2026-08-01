"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaRequiredDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>
        Required textarea <span className="text-destructive">*</span>
      </Label>

      <Textarea
        id={id}
        placeholder="Leave a message"
        className="min-h-30"
        required
      />
    </Field>
  )
}
