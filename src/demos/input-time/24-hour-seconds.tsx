"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"
import { InputTime } from "@/registry/components/input-time"

export default function InputTime24HourSecondsDemo() {
  const [value, setValue] = useState("12:00:00")

  return (
    <Field>
      <FieldLabel>Time</FieldLabel>
      <InputTime
        format="24"
        value={value}
        onValueChange={setValue}
        showSeconds
      />
      <FieldDescription>24-hour format with seconds</FieldDescription>
    </Field>
  )
}
