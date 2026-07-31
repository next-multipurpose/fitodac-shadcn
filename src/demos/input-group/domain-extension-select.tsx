import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/registry/primitives/select"

export default function InputGroupDomainExtensionSelectDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Domain</FieldLabel>

      <InputGroup>
        <InputGroupInput placeholder="your-domain" id={id} />

        <InputGroupAddon align="inline-end">
          <Select defaultValue=".com">
            <SelectTrigger className="absolute inset-e-0 border-0! shadow-none focus:ring-0!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value=".com">.com</SelectItem>
              <SelectItem value=".net">.net</SelectItem>
              <SelectItem value=".org">.org</SelectItem>
            </SelectContent>
          </Select>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
