"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"
import { InputTime } from "@/registry/components/input-time"

export default function InputTime12HourDemo() {
  const [value, setValue] = useState("12:00:00 PM")

  return (
    <Field>
      <FieldLabel>Time</FieldLabel>
      <InputTime format="12" value={value} onValueChange={setValue} />
      <FieldDescription>12-hour format</FieldDescription>
    </Field>
  )
}
