"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"
import { InputTime } from "@/registry/components/input-time"

export default function InputTime24HourDemo() {
  const [value, setValue] = useState("00:00:00")

  return (
    <Field>
      <FieldLabel>Time</FieldLabel>
      <InputTime format="24" value={value} onValueChange={setValue} />
      <FieldDescription>24-hour format</FieldDescription>
    </Field>
  )
}
