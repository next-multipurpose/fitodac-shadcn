"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"
import { InputTime } from "@/registry/components/input-time"

export default function InputTime12HourSecondsDemo() {
  const [value, setValue] = useState("12:00:00 PM")

  return (
    <Field>
      <FieldLabel>Time</FieldLabel>
      <InputTime
        format="12"
        value={value}
        onValueChange={setValue}
        showSeconds
      />
      <FieldDescription>12-hour format with seconds</FieldDescription>
    </Field>
  )
}
