"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaOverlappingLabelDemo() {
  const id = useId()

  return (
    <Field className="relative">
      <Label
        className="absolute top-0 left-1.5 z-10 block w-auto! -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-disabled:opacity-50"
        htmlFor={id}
      >
        Textarea with overlapping label
      </Label>

      <Textarea id={id} className="min-h-30" />
    </Field>
  )
}
