"use client"

import { useId, useState } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function LabelCharacterCountDemo() {
  const [length, setLength] = useState(0)
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id} className="justify-between">
        Bio
        <span className="text-muted-foreground">{length}/200</span>
      </Label>
      <Textarea
        id={id}
        placeholder="Tell us about yourself…"
        maxLength={200}
        onChange={(event) => setLength(event.target.value.length)}
      />
    </Field>
  )
}
