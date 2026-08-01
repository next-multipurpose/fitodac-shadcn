"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"
import { InputTime } from "@/registry/components/input-time"

export default function InputTimeClockIconDemo() {
  const [value, setValue] = useState("12:00:00 PM")

  return (
    <Field>
      <FieldLabel>Time</FieldLabel>
      <InputTime
        clockIcon
        format="12"
        value={value}
        onValueChange={setValue}
      />
      <FieldDescription>With a clock icon</FieldDescription>
    </Field>
  )
}
