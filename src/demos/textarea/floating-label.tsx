"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaFloatingLabelDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>
        <span className="inline-flex bg-background px-1">
          Textarea with floating label
        </span>
      </Label>

      <Textarea id={id} placeholder=" " className="min-h-30 bg-background!" />
    </Field>
  )
}
