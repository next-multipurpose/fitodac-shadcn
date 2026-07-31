"use client"

import { useState } from "react"

import { Field } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/primitives/input-group"
import { InfoIcon } from "lucide-react"

export default function InputGroupTextareaCharacterCountDemo() {
  const [value, setValue] = useState("")
  const maxLength = 140

  return (
    <Field>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Description..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          className="min-h-16 pb-12"
        />

        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs text-muted-foreground">
            {value.length}/{maxLength} characters
          </InputGroupText>
          <InfoIcon className="ml-auto text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
