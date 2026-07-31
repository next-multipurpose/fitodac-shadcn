"use client"

import { useId, useRef, useState } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { XIcon } from "lucide-react"

export default function InputGroupClearableInputDemo() {
  const id = useId()

  const [inputValue, setInputValue] = useState("Click to clear")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearInput = () => {
    setInputValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>Search</FieldLabel>

      <InputGroup>
        <InputGroupInput
          className="pe-9"
          id={id}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          ref={inputRef}
          type="text"
          value={inputValue}
        />

        {inputValue && (
          <InputGroupAddon align="inline-end">
            <button
              aria-label="Clear input"
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleClearInput}
              type="button"
            >
              <XIcon aria-hidden="true" size={16} />
            </button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </Field>
  )
}
