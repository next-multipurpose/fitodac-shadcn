"use client"

import { useId, useState } from "react"

import { Switch } from "@/registry/primitives/switch"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function SwitchControlledStateDemo() {
  const id = useId()
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <Field orientation="horizontal">
      <Switch
        aria-label="Toggle switch"
        checked={checked}
        id={id}
        onCheckedChange={setChecked}
      />
      <FieldLabel className="text-sm font-medium" htmlFor={id}>
        {checked ? "On" : "Off"}
      </FieldLabel>
    </Field>
  )
}
