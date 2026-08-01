"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchSizesDemo() {
  const id = useId()

  return (
    <div className="space-y-3">
      <Field orientation="horizontal">
        <Switch id={`${id}-sm`} defaultChecked size="sm" />
        <FieldLabel htmlFor={`${id}-sm`} className="text-sm">
          Small
        </FieldLabel>
      </Field>

      <Field orientation="horizontal">
        <Switch id={id} defaultChecked />
        <FieldLabel htmlFor={id}>Default</FieldLabel>
      </Field>
    </div>
  )
}
