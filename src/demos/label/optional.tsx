"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelOptionalDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>
        Phone number
        <span className="text-muted-foreground">(optional)</span>
      </Label>
      <Input id={id} type="text" disabled />
    </Field>
  )
}
