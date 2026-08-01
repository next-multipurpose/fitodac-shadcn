"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchDisabledDemo() {
  const id = useId()

  return (
    <div className="space-y-3">
      <Field orientation="horizontal">
        <Switch id={`${id}-unchecked`} disabled />
        <FieldLabel htmlFor={`${id}-unchecked`}>Disabled (unchecked)</FieldLabel>
      </Field>

      <Field orientation="horizontal">
        <Switch id={`${id}-checked`} defaultChecked disabled />
        <FieldLabel htmlFor={`${id}-checked`}>Disabled (checked)</FieldLabel>
      </Field>
    </div>
  )
}
