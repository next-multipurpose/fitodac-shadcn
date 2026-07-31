"use client"

import { useId, useState } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function InputGroupPasswordVisibilityDemo() {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field>
      <FieldLabel htmlFor={id}>Password</FieldLabel>

      <InputGroup>
        <InputGroupInput id={id} type={showPassword ? "text" : "password"} />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? (
              <EyeOffIcon className="size-4 text-muted-foreground" />
            ) : (
              <EyeIcon className="size-4 text-muted-foreground" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
