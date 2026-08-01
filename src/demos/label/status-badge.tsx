"use client"

import { useId } from "react"

import { Badge } from "@/registry/primitives/badge"
import { Field } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelStatusBadgeDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id} className="gap-2">
        Webhook URL
        <Badge variant="success-light" size="sm">
          Active
        </Badge>
      </Label>
      <Input id={id} type="text" required disabled />
    </Field>
  )
}
