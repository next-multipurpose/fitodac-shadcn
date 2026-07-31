import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { Search } from "lucide-react"

export default function InputGroupSearchWithResultsDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Search</FieldLabel>

      <InputGroup>
        <InputGroupInput id={id} placeholder="Search..." />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
