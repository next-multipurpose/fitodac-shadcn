"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchCustomColorDemo() {
  const id = useId()

  return (
    <Field
      orientation="horizontal"
      className="[--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]"
    >
      <FieldLabel htmlFor={id}>Colored switch</FieldLabel>
      <Switch id={id} defaultChecked />
    </Field>
  )
}
