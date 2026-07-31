import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/primitives/input-group"

export default function InputGroupDomainSuffixDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Domain</FieldLabel>

      <InputGroup>
        <InputGroupInput id={id} placeholder="google.com" />

        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
