"use client"

import { useId, useState } from "react"

import { Field, FieldDescription } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"

export default function TextareaCharacterCountDemo() {
  const id = useId()

  const [value, setValue] = useState("")
  const maxLength = 200
  const counterId = `${id}-counter`

  return (
    <Field>
      <Label htmlFor={id}>Message</Label>
      <Textarea
        className="min-h-30 bg-background"
        id={id}
        maxLength={maxLength}
        aria-describedby={counterId}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message here..."
        value={value}
      />

      <FieldDescription id={counterId} aria-live="polite" className="text-right text-sm font-medium text-muted-foreground">
        {value.length}/{maxLength}
      </FieldDescription>
    </Field>
  )
}
