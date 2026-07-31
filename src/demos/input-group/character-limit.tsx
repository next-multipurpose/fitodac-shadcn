"use client"

import { useId, useState } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"

export default function InputGroupCharacterLimitDemo() {
  const id = useId()

  const maxLength = 50

  const [value, setValue] = useState("")
  const characterCount = value.length

  return (
    <Field>
      <FieldLabel htmlFor={id}>Input with character limit</FieldLabel>

      <InputGroup>
        <InputGroupInput
          id={id}
          aria-describedby={`${id}-description`}
          className="peer pe-14"
          maxLength={maxLength}
          onChange={(event) => setValue(event.target.value)}
          type="text"
          value={value}
        />

        <InputGroupAddon
          aria-live="polite"
          align="inline-end"
          className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs text-muted-foreground tabular-nums peer-disabled:opacity-50"
        >
          {characterCount}/{maxLength}
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
