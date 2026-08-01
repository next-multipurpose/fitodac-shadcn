"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelRequiredDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>
        Email address
        <span className="text-destructive">*</span>
      </Label>
      <Input id={id} type="text" required disabled />
    </Field>
  )
}
