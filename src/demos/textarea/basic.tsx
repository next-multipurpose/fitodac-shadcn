"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaBasicDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>Your message</Label>
      <Textarea
        placeholder="Type your message here."
        id={id}
        className="min-h-30"
      />
    </Field>
  )
}
