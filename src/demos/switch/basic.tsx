"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchBasicDemo() {
  const id = useId()

  return (
    <Field orientation="horizontal">
      <Switch id={id} defaultChecked />
      <FieldLabel htmlFor={id}>Airplane Mode</FieldLabel>
    </Field>
  )
}
