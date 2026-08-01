"use client"

import { useId } from "react"

import {
  Field,
  FieldDescription,
} from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelHelperTextDemo() {
  const id = useId()

  return (
    <Field>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>API Key</Label>
        <FieldDescription>
          Your secret key for API authentication
        </FieldDescription>
      </div>
      <Input id={id} type="text" required disabled />
    </Field>
  )
}
