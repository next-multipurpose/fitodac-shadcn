import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/primitives/input-group"

export default function InputGroupCurrencyAmountDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Amount</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>

        <InputGroupInput placeholder="0.00" id={id} />

        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
